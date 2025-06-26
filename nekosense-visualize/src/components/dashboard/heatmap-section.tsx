"use client"

import {useState, useRef, useEffect} from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import type {DateRange} from "react-day-picker"
import {Slider} from "@/components/ui/slider"
import {Button} from "@/components/ui/button"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Eye, EyeOff} from "lucide-react"
import {getHeatmapApi} from "@/services/heatmap.api";
import {convertToHeatmapWithClustering, convertTrackingToHeatmap} from "@/helpers/heatmapConverter";
export interface HeatmapDataDisplay {
    x: number
    y: number
    value: number
}
interface HeatmapSectionProps {
    dateRange: DateRange
    location: string
    device: string
}

export function HeatmapSection({dateRange, location, device} : HeatmapSectionProps) {
    const [heatmapOpacity, setHeatmapOpacity] = useState(70)
    const [showHeatmap, setShowHeatmap] = useState(true)
    const [viewportWidth, setViewportWidth] = useState(1280)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const scrollCanvasRef = useRef<HTMLCanvasElement>(null)
    const [mockHeatmapData, setMockHeatmapData] = useState<HeatmapDataDisplay[]>([])
    const fetchData = async () => {
        try {
            const res = await getHeatmapApi()
            const heatmapGrid = convertTrackingToHeatmap(res, 50);
            console.log("Heatmap data with clustering:", heatmapGrid)
            setMockHeatmapData(heatmapGrid)
            console.log("Fetched performance data:", res)
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    // Mock data for heatmap


    // Mock data for scroll depth
    const mockScrollData = [
        {depth: 0, percentage: 100},
        {depth: 500, percentage: 80},
        {depth: 1000, percentage: 60},
        {depth: 1500, percentage: 40},
        {depth: 2000, percentage: 20},
        {depth: 2500, percentage: 10},
    ]

    useEffect(() => {
        // Draw heatmap
        const canvas = canvasRef.current
        if (canvas) {
            const ctx = canvas.getContext("2d")
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height)

                if (showHeatmap) {
                    mockHeatmapData.forEach((point) => {
                        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 50)

                        const alpha = (point.value / 40) * (heatmapOpacity / 100)

                        gradient.addColorStop(0, `rgba(255, 0, 0, ${alpha})`)
                        gradient.addColorStop(0.5, `rgba(255, 255, 0, ${alpha * 0.6})`)
                        gradient.addColorStop(1, `rgba(0, 0, 255, 0)`)

                        ctx.fillStyle = gradient
                        ctx.beginPath()
                        ctx.arc(point.x, point.y, 50, 0, 2 * Math.PI)
                        ctx.fill()
                    })
                }
            }
        }

        // Draw scroll depth
        const scrollCanvas = scrollCanvasRef.current
        if (scrollCanvas) {
            const ctx = scrollCanvas.getContext("2d")
            if (ctx) {
                ctx.clearRect(0, 0, scrollCanvas.width, scrollCanvas.height)

                // Draw webpage background
                ctx.fillStyle = "#f9f9f9"
                ctx.fillRect(0, 0, scrollCanvas.width, scrollCanvas.height)

                // Draw scroll depth gradient
                const gradient = ctx.createLinearGradient(0, 0, 0, scrollCanvas.height)
                gradient.addColorStop(0, "rgba(0, 255, 0, 0.5)")
                gradient.addColorStop(0.6, "rgba(255, 255, 0, 0.5)")
                gradient.addColorStop(1, "rgba(255, 0, 0, 0.1)")

                ctx.fillStyle = gradient
                ctx.fillRect(0, 0, scrollCanvas.width, scrollCanvas.height)

                // Draw percentage lines
                ctx.strokeStyle = "#333"
                ctx.lineWidth = 1

                mockScrollData.forEach((data) => {
                    const y = (data.depth / 2500) * scrollCanvas.height

                    ctx.beginPath()
                    ctx.moveTo(0, y)
                    ctx.lineTo(scrollCanvas.width, y)
                    ctx.stroke()

                    ctx.fillStyle = "#000"
                    ctx.font = "12px Arial"
                    ctx.fillText(`${data.percentage}%`, 10, y - 5)
                })
            }
        }
    }, [heatmapOpacity, showHeatmap])

    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <CardTitle>Heatmap & Scroll Depth</CardTitle>
                            <CardDescription>Visualize where users hover </CardDescription>
                        </div>
                        <div className="flex items-center gap-4">
                            <Select
                                defaultValue={viewportWidth.toString()}
                                onValueChange={(value) => setViewportWidth(Number.parseInt(value))}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Viewport Width"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="375">Mobile (375px)</SelectItem>
                                    <SelectItem value="768">Tablet (768px)</SelectItem>
                                    <SelectItem value="1280">Desktop (1280px)</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="outline" size="icon" onClick={() => setShowHeatmap(!showHeatmap)}>
                                {showHeatmap ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <span className="text-sm">Opacity:</span>
                            <Slider
                                value={[heatmapOpacity]}
                                onValueChange={(value) => setHeatmapOpacity(value[0])}
                                max={100}
                                step={1}
                                className="w-[200px]"
                            />
                            <span className="text-sm">{heatmapOpacity}%</span>
                        </div>
                        <div className="relative border rounded-md overflow-hidden">
                            {/*<Image
                                src="/images/heatmap_example.png"
                                height={900}
                                width={1280}
                                alt="Website screenshot"
                                className="w-full"
                                style={{maxWidth: `${viewportWidth}px`, margin: "0 auto"}}
                            />*/}
                            <iframe
                                src="http://localhost:5173/"
                                height={900}
                                width={1280}
                                className="w-full"
                               /* style={{maxWidth: `${viewportWidth}px`, margin: "0 auto"}}*/
                            >

                            </iframe>
                            <canvas ref={canvasRef} width={1280} height={800}
                                    className="absolute top-0 left-0 w-full h-full"/>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}
