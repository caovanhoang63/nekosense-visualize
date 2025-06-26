import {axiosInstance} from "@/axiosInstance";

export interface HeatmapResponse {
    x:number;
    y:number;
    timestamp:number;
}
export const getHeatmapApi = async () => {
    try {
        const response = await axiosInstance.get<HeatmapResponse[]>(
            "heat-map");
        return response.data;
    } catch (error) {
        console.error("Error fetching Data: ", error);
        throw new Error("Error fetching Data");
    }
}