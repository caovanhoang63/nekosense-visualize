"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { DateRange } from "react-day-picker"
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
    Area,
} from "recharts"

interface InteractionMetricsProps {
    dateRange: DateRange
    location: string
    device: string
}

// Mock data for time on page
const timeOnPageData = [
    { date: "Apr 1", value: 120 },
    { date: "Apr 2", value: 145 },
    { date: "Apr 3", value: 132 },
    { date: "Apr 4", value: 167 },
    { date: "Apr 5", value: 178 },
    { date: "Apr 6", value: 156 },
    { date: "Apr 7", value: 189 },
]

// Mock data for page views
const pageViewsData = [
    { date: "Apr 1", views: 1250, uniqueVisitors: 850 },
    { date: "Apr 2", views: 1420, uniqueVisitors: 920 },
    { date: "Apr 3", views: 1380, uniqueVisitors: 890 },
    { date: "Apr 4", views: 1590, uniqueVisitors: 1020 },
    { date: "Apr 5", views: 1680, uniqueVisitors: 1150 },
    { date: "Apr 6", views: 1520, uniqueVisitors: 980 },
    { date: "Apr 7", views: 1720, uniqueVisitors: 1200 },
]

// Mock data for element interactions
const elementInteractionData = [
    { element: "Hero Button", clicks: 450, hover: 780, timeToFirstAction: 3.2 },
    { element: "Navigation Menu", clicks: 320, hover: 650, timeToFirstAction: 1.8 },
    { element: "Product Cards", clicks: 580, hover: 920, timeToFirstAction: 4.5 },
    { element: "Search Bar", clicks: 280, hover: 520, timeToFirstAction: 5.2 },
    { element: "Footer Links", clicks: 150, hover: 320, timeToFirstAction: 8.7 },
]

export function InteractionMetrics({ dateRange, location, device }: InteractionMetricsProps) {
    console.log()
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
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="value" name="Seconds" stroke="#8884d8" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card className="col-span-3">
                <CardHeader>
                    <CardTitle>Page Views & Referrals</CardTitle>
                    <CardDescription>Total page views and unique visitors</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={pageViewsData}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Area type="monotone" dataKey="views" stackId="1" stroke="#8884d8" fill="#8884d8" />
                                <Area type="monotone" dataKey="uniqueVisitors" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
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
                            <AreaChart
                                data={elementInteractionData}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="element" />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip />
                                <Legend />
                                <Area yAxisId="left" type="monotone" dataKey="clicks" stroke="#8884d8" fill="#8884d8" />
                                <Area yAxisId="left" type="monotone" dataKey="hover" stroke="#82ca9d" fill="#82ca9d" />
                                <Line
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey="timeToFirstAction"
                                    name="Time to First Action (s)"
                                    stroke="#ff7300"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
