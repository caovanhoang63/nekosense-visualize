"use client"

import { useState } from "react"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { DemographicsSection } from "@/components/dashboard/demographics-section"
import { HeatmapSection } from "@/components/dashboard/heatmap-section"
import { InteractionMetrics } from "@/components/dashboard/interaction-metrics"
import { PagePerformance } from "@/components/dashboard/page-performance"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs"
import { FilterBar } from "@/components/dashboard/filter-bar"

export default function DashboardView() {
    const [activeTab, setActiveTab] = useState("overview")
    const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
        from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        to: new Date(),
    })
    const [selectedLocation, setSelectedLocation] = useState("all")
    const [selectedDevice, setSelectedDevice] = useState("all")

    return (
        <DashboardShell>
            <DashboardHeader
                title="Analytics Dashboard"
                description="Comprehensive view of user behavior and site performance"
            >
                <DatePickerWithRange
                    date={dateRange}
                    setDate={(date) => setDateRange({ from: date.from ?? dateRange.from, to: date.to ?? dateRange.to })}
                />
            </DashboardHeader>

            <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <FilterBar
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                selectedDevice={selectedDevice}
                setSelectedDevice={setSelectedDevice}
            />

            {activeTab === "overview" && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <InteractionMetrics dateRange={dateRange} location={selectedLocation} device={selectedDevice} />
                    <PagePerformance dateRange={dateRange} location={selectedLocation} device={selectedDevice} />
                </div>
            )}

            {activeTab === "demographics" && (
                <DemographicsSection dateRange={dateRange} location={selectedLocation} device={selectedDevice} />
            )}

            {activeTab === "heatmap" && (
                <HeatmapSection dateRange={dateRange} location={selectedLocation} device={selectedDevice} />
            )}
        </DashboardShell>
    )
}
