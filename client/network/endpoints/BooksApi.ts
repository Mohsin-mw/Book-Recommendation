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

export async function GetBook(isbn: string): Promise<AxiosPromise> {
    return await axiosClient().get(`/booksbyid/${isbn}`).then(res => res.data)
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

export async function GetTopRatedBooks(): Promise<AxiosPromise> {
    return await axiosClient().get(`/books/top-rated`).then(res => res.data)
}


export async function getAllComments(): Promise<AxiosPromise> {
    return await axiosClient().get('/comments');
}

export async function addComment(commentData: any): Promise<AxiosPromise> {
    console.log(commentData)
    return await axiosClient().post('/comments', commentData);
}

export async function updateComment(commentId: number, commentData: any): Promise<AxiosPromise> {
    return await axiosClient().put(`/comments/${commentId}`, commentData);
}

export async function deleteComment(commentId: number): Promise<AxiosPromise> {
    return await axiosClient().delete(`/comments/${commentId}`);
}

export async function getCommentsByBook(bookId: number): Promise<AxiosPromise> {
    return await axiosClient().get(`/comments/book/${bookId}`);
}

export async function requestNewBook(bookTitle: string, bookISBN: string): Promise<AxiosPromise> {
    return await axiosClient().post('/requests', {
        title: bookTitle,
        isbn: bookISBN
    })
}