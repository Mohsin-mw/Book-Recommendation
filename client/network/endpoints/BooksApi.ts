import {axiosClient} from "@/network/apiClient";
import {AxiosPromise} from "axios";
import {bookInterface} from "@/types/types";


export interface GetRecommendationsResponse {
    books: bookInterface[];
    pagination: {
        current_page: number;
        next_page: number | null;
        per_page: number;
        prev_page: number | null;
        total_books: number;
        total_pages: number;
    };
}


export async function QueryBooks(query: string): Promise<AxiosPromise> {
    return await axiosClient().get(`/books?query=${query}`).then(res => res.data)
}

export async function GetBook(title: string): Promise<AxiosPromise> {
    return await axiosClient().get(`/books?title=${title}`).then(res => res.data)
}

export async function GetRecommendations(title: string, page: number = 1, perPage: number = 10): Promise<AxiosPromise> {
    try {
        const response = await axiosClient().post(`/recommendations?page=${page}&per_page=${perPage}`, {title});
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.error || 'Failed to get recommendations');
    }
}

export async function GetBooksByGenre(genre: string, page?: number): Promise<AxiosPromise> {
    return await axiosClient().get(`/books/genres/${genre}?page=${page ? page : 1}`)
}