import {axiosInstance} from "@/axiosInstance";
import {SampleResponse} from "@/services/sample.api";

export interface ClickResponse {
    event: string;
    ele: string;
    eleId: string;
    timestamp: number;
    url: string;
    data: string[] | null;
}

export const getClicksApi = async () => {
   /* const response = await axiosInstance.get<ClickResponse[]>("/clicks");
    return response.data;*/
    try {
        const response = await axiosInstance.get<ClickResponse[]>(
            "clicks");
        return response.data;
    } catch (error) {
        console.error("Error fetching Data: ", error);
        throw new Error("Error fetching Data");
    }
}

export interface HoverToClickEntryItem {
    Key: string
    Value: string | number | boolean | null
}

export interface HoverToClickEvent {
    event: "hover-to-click"
    ele: string
    eleId: string
    timestamp: number
    url: string
    data: HoverToClickEntryItem[]
}
export const getHoverToClickApi = async () => {
    /* const response = await axiosInstance.get<ClickResponse[]>("/clicks");
     return response.data;*/
    try {
        const response = await axiosInstance.get<HoverToClickEvent[]>(
            "hover-to-click");
        return response.data;
    } catch (error) {
        console.error("Error fetching Data: ", error);
        throw new Error("Error fetching Data");
    }
}