"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import type {DateRange} from "react-day-picker"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Area, BarChart, Bar,
} from "recharts"
import {useEffect, useState} from "react";
import {getHoverToClickApi} from "@/services/clicks.api";
import {convertHoverToClickDataAdvanced} from "@/helpers/jsonToClickDataDisplay";
import {getPageViewsApi, getTimeOnPagesApi} from "@/services/pageInfo.api";
import {convertApiDataToPageViews, convertApiDataToTimeOnPage} from "@/helpers/jsonToPageViewsDisplay";

export interface HoverToClickDataDisplay {
    element: string
    clicks: number
    hover: number
}

interface InteractionMetricsProps {
    dateRange: DateRange
    location: string
    device: string
}

export interface TimeOnPageDataDisplay {
    date: string
    value: number
}

export interface PageViewsDataDisplay {
    date: string
    views: number
}

export function InteractionMetrics({dateRange, location, device}: InteractionMetricsProps) {
    const [hoverToClickData, setHoverToClickData] = useState<HoverToClickDataDisplay[]>([])
    const [pageViewData, setPageViewData] = useState<PageViewsDataDisplay[]>([])
    const [timeOnPageData, setTimeOnPageData] = useState<TimeOnPageDataDisplay[]>([])
    const fetchData = async () => {
        try {
            const res = await getHoverToClickApi()
            console.log("Fetched hover to click data:", res)
            const advancedResult = convertHoverToClickDataAdvanced(res, {
                sortBy: 'hover',
                sortOrder: 'desc',
                minClicks: 1,
                elementNameMapping: {
                    'product-product-1': 'Product Card 1',
                    'product-product-2': 'Product Card 2'
                }
            });
            setHoverToClickData(advancedResult);
            console.log('Advanced result:', advancedResult);
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }
    const fetchViewsData = async () => {
        try {
            const res = await getPageViewsApi()
            const pageViewsData = convertApiDataToPageViews(res)
            setPageViewData(pageViewsData)
            console.log("Fetched page views data:", res)
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }
    const fetchTimeOnPageData = async () => {
        try {
            const res = await getTimeOnPagesApi()
            const timeOnPage = convertApiDataToTimeOnPage(res)
            setTimeOnPageData(timeOnPage)
            console.log("Fetched page views data:", res)
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }
    useEffect(() => {
        fetchData()
        fetchViewsData()
        fetchTimeOnPageData()
    }, [])
    return (
        <>
            <Card className="col-span-3">
                <CardHeader>
                    <CardTitle>Time on Page</CardTitle>
                    <CardDescription>Average time users spend on each page (seconds)</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={timeOnPageData}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="date"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/>
                                <Line type="monotone" dataKey="value" name="Seconds" stroke="#8884d8"
                                      activeDot={{r: 8}}/>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card className="col-span-3">
                <CardHeader>
                    <CardTitle>Page Views & Referrals</CardTitle>
                    <CardDescription>Total page views</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={pageViewData}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="date"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/>
                                <Area type="monotone" dataKey="views" stackId="1" stroke="#8884d8" fill="#8884d8"/>
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card className="col-span-3">
                <CardHeader>
                    <CardTitle>Element Interactions</CardTitle>
                    <CardDescription>Click, hover, and time to first action metrics</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={hoverToClickData}
                                margin={{top: 20, right: 30, left: 20, bottom: 5}}
                            >
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="element"/>
                                <YAxis yAxisId="left"/>
                                <YAxis
                                    yAxisId="right"
                                    orientation="right"
                                    label={{
                                        value: "Hover Duration (ms)",
                                        angle: -90,
                                        position: "insideRight",
                                        dx: 10
                                    }}
                                />
                                <Tooltip/>
                                <Legend/>
                                <Bar dataKey="clicks" yAxisId="left" fill="#8884d8" name="Clicks"/>
                                <Bar dataKey="hover" yAxisId="right" fill="#82ca9d" name="Hovers (ms)"/>
                            </BarChart>
                        </ResponsiveContainer>

                    </div>
                </CardContent>
            </Card>
        </>
    )
}
