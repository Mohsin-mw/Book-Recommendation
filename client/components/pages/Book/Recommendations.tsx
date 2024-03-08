import React from 'react';
import {GetRecommendations} from "@/network/endpoints/BooksApi";
import {bookInterface} from "@/types/types";
import {AxiosError} from "axios";
import Image from "next/image";
import Link from "next/link";
import BooksGrid from "@/components/pages/shared/BooksGrid";


const Recommendations = async ({title}: { title: string }) => {
    const {data} = await GetRecommendations(title);
    const {books, error}: { books: bookInterface[], error: AxiosError } = data
    return (
        <BooksGrid books={books}/>
    );
};

export default Recommendations;