"use client"

import {useEffect, useState} from "react"
import {DatePickerWithRange} from "@/components/date-range-picker"
import {DemographicsSection} from "@/components/dashboard/demographics-section"
import {HeatmapSection} from "@/components/dashboard/heatmap-section"
import {InteractionMetrics} from "@/components/dashboard/interaction-metrics"
import {PagePerformance} from "@/components/dashboard/page-performance"
import {DashboardHeader} from "@/components/dashboard/dashboard-header"
import {DashboardShell} from "@/components/dashboard/dashboard-shell"
import {DashboardTabs} from "@/components/dashboard/dashboard-tabs"
import {sampleList, SampleResponse} from "@/services/sample.api";
import {ClickResponse, getClicksApi} from "@/services/clicks.api";
import {getPerformanceApi} from "@/services/performance.api";

export default function DashboardView() {
    const [activeTab, setActiveTab] = useState("overview")
    const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
        from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        to: new Date(),
    })
    const [selectedLocation, setSelectedLocation] = useState("all")
    const [selectedDevice, setSelectedDevice] = useState("all")
    const [clicks, setClicks] = useState<ClickResponse[]>([])
    const fetchData = async () => {
        try {
            const res = await getClicksApi()
            const perRes = await getPerformanceApi()
            setClicks(res)
            console.log("Fetched data:", res)
            console.log("Fetched performance data:", perRes)
        }
        catch (error) {
            console.error("Error fetching data:", error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])


    return (
        <DashboardShell>
            <DashboardHeader
                title="Analytics Dashboard"
                description="Comprehensive view of user behavior and site performance"
            >
               {/* <DatePickerWithRange
                    date={dateRange}
                    setDate={(date) => setDateRange({from: date.from ?? dateRange.from, to: date.to ?? dateRange.to})}
                />*/}
            </DashboardHeader>

            <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab}/>

            {activeTab === "overview" && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <InteractionMetrics dateRange={dateRange} location={selectedLocation} device={selectedDevice}/>
                    <PagePerformance dateRange={dateRange} location={selectedLocation} device={selectedDevice}/>
                </div>
            )}

            {activeTab === "demographics" && (
                <DemographicsSection dateRange={dateRange} location={selectedLocation} device={selectedDevice}/>
            )}

            {activeTab === "heatmap" && (
                <HeatmapSection dateRange={dateRange} location={selectedLocation} device={selectedDevice}/>
            )}
            {activeTab === "interactions" && (
                <InteractionMetrics dateRange={dateRange} location={selectedLocation} device={selectedDevice}/>
            )}
            {activeTab === "performance" && (
                <PagePerformance dateRange={dateRange} location={selectedLocation} device={selectedDevice}/>
            )}
        </DashboardShell>
    )
}
