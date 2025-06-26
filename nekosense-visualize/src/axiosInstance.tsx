import axios from "axios";

// Create an Axios instance
export const axiosInstance = axios.create({
    baseURL: "http://157.180.78.90:8080",
    timeout: 20000,
    headers: {
        "Content-Type": "application/json",
    },
});