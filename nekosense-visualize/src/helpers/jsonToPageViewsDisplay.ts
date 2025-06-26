import {PageViewsDataDisplay, TimeOnPageDataDisplay} from "@/components/dashboard/interaction-metrics";
import {PageViewEvent, TimeOnPageEvent} from "@/services/pageInfo.api";

export function convertApiDataToPageViews(apiData: PageViewEvent[]): PageViewsDataDisplay[] {
    // Group by date
    const dateGroups: { [key: string]: number } = {}

    apiData.forEach(item => {
        // Convert timestamp to date string
        const date = new Date(item.timestamp)
        const dateKey = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        })

        // Count views per date
        dateGroups[dateKey] = (dateGroups[dateKey] || 0) + 1
    })

    // Convert to PageViewsDataDisplay format
    return Object.entries(dateGroups)
        .map(([date, views]) => ({
            date,
            views
        }))
        .sort((a, b) => {
            // Sort by date (simple string comparison works for "MMM d" format)
            return new Date(a.date + " 2025").getTime() - new Date(b.date + " 2025").getTime()
        })
}

export function convertApiDataToTimeOnPage(apiData: TimeOnPageEvent[]): TimeOnPageDataDisplay[] {
    // Group by date and collect durations
    const dateGroups: { [key: string]: number[] } = {}

    apiData.forEach(item => {
        // Convert timestamp to date string
        const date = new Date(item.timestamp)
        const dateKey = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        })

        // Extract duration from data array
        const durationData = item.data.find(d => d.Key === 'duration')
        if (durationData) {
            if (!dateGroups[dateKey]) {
                dateGroups[dateKey] = []
            }
            // Convert milliseconds to seconds
            dateGroups[dateKey].push(Math.round(Number(durationData.Value) / 1000))
        }
    })

    // Calculate average time on page per date
    return Object.entries(dateGroups)
        .map(([date, durations]) => ({
            date,
            value: Math.round(durations.reduce((sum, duration) => sum + duration, 0) / durations.length)
        }))
        .sort((a, b) => {
            return new Date(a.date + " 2025").getTime() - new Date(b.date + " 2025").getTime()
        })
}