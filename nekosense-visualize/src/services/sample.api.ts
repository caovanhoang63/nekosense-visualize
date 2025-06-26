import {axiosInstance} from "@/axiosInstance";

export interface SampleResponse {
    id: number;
    title: string;
    description: string;
    ingredients: string[],
    image: string;

}
export async function sampleList(): Promise<SampleResponse[]> {
    try {
        const response = await axiosInstance.get<SampleResponse[]>(
            "https://api.sampleapis.com/coffee/hot");
        return response.data;
    } catch (error) {
        console.error("Error fetching Data: ", error);
        throw new Error("Error fetching Data");
    }
}