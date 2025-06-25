"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { DateRange } from "react-day-picker"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface PagePerformanceProps {
    dateRange: DateRange
    location: string
    device: string
}

// Mock data for page performance
const performanceData = [
    { page: "Homepage", lcp: 2.1, fid: 0.08, cls: 0.05 },
    { page: "Products", lcp: 2.8, fid: 0.12, cls: 0.08 },
    { page: "Blog", lcp: 3.2, fid: 0.15, cls: 0.12 },
    { page: "Checkout", lcp: 2.5, fid: 0.1, cls: 0.07 },
    { page: "Contact", lcp: 1.9, fid: 0.05, cls: 0.03 },
]

// Mock data for search tracking
const searchData = [
    { term: "product", count: 120 },
    { term: "pricing", count: 85 },
    { term: "support", count: 65 },
    { term: "contact", count: 45 },
    { term: "blog", count: 35 },
]

export function PagePerformance({ dateRange, location, device }: PagePerformanceProps) {
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
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="page" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="lcp" name="LCP (s)" fill="#8884d8" />
                                <Bar dataKey="fid" name="FID (s)" fill="#82ca9d" />
                                <Bar dataKey="cls" name="CLS" fill="#ffc658" />
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
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis dataKey="term" type="category" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" name="Search Count" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
