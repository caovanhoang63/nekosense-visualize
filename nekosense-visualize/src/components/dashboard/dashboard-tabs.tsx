"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Users, MousePointerClick, Activity, Search, Timer } from "lucide-react"

interface DashboardTabsProps {
    activeTab: string
    setActiveTab: (tab: string) => void
}

export function DashboardTabs({ activeTab, setActiveTab }: DashboardTabsProps) {
    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
            <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    <span className="hidden md:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="demographics" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span className="hidden md:inline">Demographics</span>
                </TabsTrigger>
                <TabsTrigger value="heatmap" className="flex items-center gap-2">
                    <MousePointerClick className="h-4 w-4" />
                    <span className="hidden md:inline">Heatmap & Scroll</span>
                </TabsTrigger>
                <TabsTrigger value="interactions" className="flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    <span className="hidden md:inline">Interactions</span>
                </TabsTrigger>
                {/*<TabsTrigger value="search" className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    <span className="hidden md:inline">Search Analytics</span>
                </TabsTrigger>*/}
                <TabsTrigger value="performance" className="flex items-center gap-2">
                    <Timer className="h-4 w-4" />
                    <span className="hidden md:inline">Performance</span>
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
