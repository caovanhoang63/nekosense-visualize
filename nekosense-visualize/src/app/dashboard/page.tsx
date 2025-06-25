import type { Metadata } from "next"
import DashboardView from "@/components/dashboard/dashboard-view"

export const metadata: Metadata = {
    title: "Analytics Dashboard",
    description: "Comprehensive analytics dashboard with tracking visualization",
}

export default function DashboardPage() {
    return <DashboardView />
}
