import {axiosClient} from "@/network/apiClient";
import {AxiosPromise} from "axios";

export async function QueryBooks(query: string): Promise<AxiosPromise> {
    return await axiosClient().get(`/books?query=${query}`).then(res => res.data)
}