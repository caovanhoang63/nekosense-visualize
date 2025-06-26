import type { ReactNode } from "react"

interface DashboardHeaderProps {
    title: string
    description: string
    children?: ReactNode
}

export function DashboardHeader({ title, description, children }: DashboardHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                <p className="text-muted-foreground">{description}</p>
            </div>
            <div className="flex items-center gap-2">{children}</div>
        </div>
    )
}
