import {axiosInstance} from "@/axiosInstance";

export interface PageViewEntryItem {
    Key: string
    Value: string | number | boolean | null
}

export interface PageViewEvent {
    event: "pageView"
    ele: string
    eleId: string
    timestamp: number
    url: string
    data: PageViewEntryItem[]
}
export const getPageViewsApi = async () => {
    try {
        const response = await axiosInstance.get<PageViewEvent[]>(
            "page-view");
        return response.data;
    } catch (error) {
        console.error("Error fetching Data: ", error);
        throw new Error("Error fetching Data");
    }
}

export interface TimeOnPageEntryItem {
    Key: string
    Value: string | number | boolean
}

export interface TimeOnPageEvent {
    event: "pageView"
    ele: string
    eleId: string
    timestamp: number
    url: string
    data: TimeOnPageEntryItem[]
}
export const getTimeOnPagesApi = async () => {
    try {
        const response = await axiosInstance.get<TimeOnPageEvent[]>(
            "time-on-page");
        return response.data;
    } catch (error) {
        console.error("Error fetching Data: ", error);
        throw new Error("Error fetching Data");
    }
}