import {HoverToClickDataDisplay} from "@/components/dashboard/interaction-metrics";
import {HoverToClickEvent} from "@/services/clicks.api";

export function convertHoverToClickDataAdvanced(
    apiData: HoverToClickEvent[],
    options: {
        sortBy?: 'clicks' | 'hover' | 'element';
        sortOrder?: 'asc' | 'desc';
        minClicks?: number;
        elementNameMapping?: Record<string, string>;
    } = {}
): HoverToClickDataDisplay[] {
    const {
        sortBy = 'clicks',
        sortOrder = 'desc',
        minClicks = 0,
        elementNameMapping = {}
    } = options;

    const groupedData = new Map<string, {
        clicks: number;
        totalDuration: number;
    }>();

    // Group data by eleId
    apiData.forEach(item => {
        const { eleId, data } = item;

        const durationData = data.find(d => d.Key === "duration");
        const durationValue = durationData ? Number(durationData.Value) || 0 : 0;

        if (groupedData.has(eleId)) {
            const existingData = groupedData.get(eleId)!;
            existingData.clicks += 1;
            existingData.totalDuration += durationValue;
        } else {
            groupedData.set(eleId, {
                clicks: 1,
                totalDuration: durationValue
            });
        }
    });

    // Convert to array
    const result: HoverToClickDataDisplay[] = [];

    groupedData.forEach((value, eleId) => {
        // Lọc theo minClicks
        if (value.clicks >= minClicks) {
            result.push({
                element: elementNameMapping[eleId] || eleId,
                clicks: value.clicks,
                hover: value.totalDuration
            });
        }
    });

    // Sắp xếp theo tùy chọn
    result.sort((a, b) => {
        let comparison = 0;

        switch (sortBy) {
            case 'clicks':
                comparison = a.clicks - b.clicks;
                break;
            case 'hover':
                comparison = a.hover - b.hover;
                break;
            case 'element':
                comparison = a.element.localeCompare(b.element);
                break;
        }

        return sortOrder === 'desc' ? -comparison : comparison;
    });

    return result;
}