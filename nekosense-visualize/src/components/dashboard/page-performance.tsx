"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import type {DateRange} from "react-day-picker"
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from "recharts"
import {getClicksApi} from "@/services/clicks.api";
import {getPerformanceApi} from "@/services/performance.api";
import {useEffect, useState} from "react";
import {processPerformanceData} from "@/helpers/jsonToPerformanceDisplay";

interface PagePerformanceProps {
    dateRange: DateRange
    location: string
    device: string
}

export interface PerformanceDataDisplay {
    page: string
    lcp: number
    cls: number
    inp: number
}

// Mock data for page performance
/*const performanceData: PerformanceDataDisplay[] = [
    {page: "Homepage", lcp: 0, cls: 0, inp: 0},
]*/

// Mock data for search tracking
const searchData = [
    {term: "product", count: 120},
    {term: "pricing", count: 85},
    {term: "support", count: 65},
    {term: "contact", count: 45},
    {term: "blog", count: 35},
]

export function PagePerformance({dateRange, location, device}: PagePerformanceProps) {

    const [performanceData, setPerformanceData] = useState<PerformanceDataDisplay[]>([])
    const fetchData = async () => {
        try {
            const perRes = await getPerformanceApi()
            const processedData = processPerformanceData(perRes);
            console.log(processedData)
            setPerformanceData(processedData)
            console.log("Fetched performance data:", perRes)
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <Card className="col-span-3">
                <CardHeader>
                    <CardTitle>Page Performance</CardTitle>
                    <CardDescription>Core Web Vitals metrics across pages</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={performanceData}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="page"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/>
                                <Bar dataKey="lcp" name="LCP (s)" fill="#8884d8"/>
                                <Bar dataKey="cls" name="FID (s)" fill="#82ca9d"/>
                                <Bar dataKey="inp" name="CLS" fill="#ffc658"/>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card className="col-span-3">
                <CardHeader>
                    <CardTitle>On-site Search Tracking</CardTitle>
                    <CardDescription>Most popular search terms used on your site</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={searchData}
                                layout="vertical"
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis type="number"/>
                                <YAxis dataKey="term" type="category"/>
                                <Tooltip/>
                                <Legend/>
                                <Bar dataKey="count" name="Search Count" fill="#8884d8"/>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
