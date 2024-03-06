import axios, {AxiosRequestConfig} from "axios";

export function axiosClient(token?: string) {
    const headers: AxiosRequestConfig["headers"] = {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    return axios.create({
        baseURL: "http://127.0.0.1:5000/api",
        headers,
    });
}
