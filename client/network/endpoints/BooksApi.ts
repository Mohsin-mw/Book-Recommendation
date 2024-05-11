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
    return await axiosClient().get(`http://localhost:8000/api/books/book?title=${query}`).then(res => res.data)
}

export async function GetBook(isbn: string): Promise<AxiosPromise> {
    return await axiosClient().get(`http://localhost:8000/api/books/book?isbn=${isbn}`).then(res => res.data)
}

export async function GetRecommendations(title: string, page: number, perPage: number = 10): Promise<AxiosPromise> {
    try {
        const response = await axiosClient().get(`http://localhost:8000/api/books/recommendations?page=${page}&title=${title}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.error || 'Failed to get recommendations');
    }
}

export async function GetTopRatedBooks(): Promise<AxiosPromise> {
    return await axiosClient().get(`http://localhost:8000/api/books/top-rated-books`).then(res => res.data)
}


export async function addComment(commentData: any): Promise<AxiosPromise> {
    console.log(commentData)
    return await axiosClient().post('http://localhost:8000/api/comments', commentData);
}


export async function getCommentsByBook(bookId: number): Promise<AxiosPromise> {
    return await axiosClient().get(`http://localhost:8000/api/comments-by-book?book_id=${bookId}`);
}

export async function requestNewBook(bookTitle: string, bookISBN: string): Promise<AxiosPromise> {
    return await axiosClient().post('http://localhost:8000/api/request', {
        title: bookTitle,
        isbn: bookISBN
    })
}