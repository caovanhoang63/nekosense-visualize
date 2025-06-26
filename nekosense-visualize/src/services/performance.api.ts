import {axiosInstance} from "@/axiosInstance";

export interface PerformanceEntryItem {
    Key: string
    Value: string | number | boolean | NestedEntry[] | null
}

export type NestedEntry = {
    Key: string
    Value: string | number | boolean | null
}

export interface PerformanceEvent {
    event: "performance"
    ele: string
    eleId: string
    timestamp: number
    url: string
    data: PerformanceEntryItem[]
}
export const getPerformanceApi = async () => {
    try {
        const response = await axiosInstance.get<PerformanceEvent[]>(
            "performance");
        return response.data;
    } catch (error) {
        console.error("Error fetching Data: ", error);
        throw new Error("Error fetching Data");
    }
}