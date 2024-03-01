import axios from "axios";

export function axiosClient() {
    return axios.create({
        baseURL: "http://127.0.0.1:8000/api",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
}

export function axiosClientWithToken(token: string) {
    return axios.create({
        baseURL: "http://127.0.0.1:8000/api",
        headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    });
}