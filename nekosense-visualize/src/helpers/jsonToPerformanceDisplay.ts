import {PerformanceDataDisplay} from "@/components/dashboard/page-performance";
import {PerformanceEvent} from "@/services/performance.api";

export function processPerformanceData(perRes: PerformanceEvent[]): PerformanceDataDisplay[] {
    // Group data by URL
    const groupedData: { [url: string]: { lcp: number[], cls: number[], inp: number[] } } = {};

    perRes.forEach(item => {
        const url = item.url;
        const metricName = item.data.find((d) => d.Key === 'name')?.Value;
        const metricValue = item.data.find((d) => d.Key === 'value')?.Value;

        if (!groupedData[url]) {
            groupedData[url] = { lcp: [], cls: [], inp: [] };
        }

        // Add metric values to respective arrays
        if (metricName === 'LCP' && typeof metricValue === 'number') {
            groupedData[url].lcp.push(metricValue);
        } else if (metricName === 'CLS' && typeof metricValue === 'number') {
            groupedData[url].cls.push(metricValue);
        } else if (metricName === 'INP' && typeof metricValue === 'number') {
            groupedData[url].inp.push(metricValue);
        }
    });

    // Calculate averages and create result array
    const result: PerformanceDataDisplay[] = [];

    Object.entries(groupedData).forEach(([url, metrics]) => {
        // Determine page name
        let pageName = "Unknown";
        if (url === "http://localhost:5173/") {
            pageName = "Homepage";
        } else if (url.includes("/product/")) {
            pageName = "Product Page";
        }

        // Calculate averages
        const avgLcp = metrics.lcp.length > 0
            ? Math.round(metrics.lcp.reduce((sum, val) => sum + val, 0) / metrics.lcp.length)
            : 0;

        const avgCls = metrics.cls.length > 0
            ? Math.round((metrics.cls.reduce((sum, val) => sum + val, 0) / metrics.cls.length) * 1000) / 1000
            : 0;

        const avgInp = metrics.inp.length > 0
            ? Math.round(metrics.inp.reduce((sum, val) => sum + val, 0) / metrics.inp.length)
            : 0;

        result.push({
            page: pageName,
            lcp: avgLcp / 1000,
            cls: avgCls  / 1000,
            inp: avgInp  / 1000
        });
    });

    return result;
}