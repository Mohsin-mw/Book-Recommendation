import {axiosClient} from "@/network/apiClient";
import {AxiosPromise} from "axios";

export async function QueryBooks(query: string): Promise<AxiosPromise> {
    return await axiosClient().get(`/books?query=${query}`).then(res => res.data)
}

export async function GetBook(title: string): Promise<AxiosPromise> {
    return await axiosClient().get(`/books?title=${title}`).then(res => res.data)
}

export async function GetRecommendations(title: string): Promise<AxiosPromise> {
    return await axiosClient().post(`/recommendations`, {title}).then(res => res.data)
}