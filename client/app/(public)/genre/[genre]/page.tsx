"use client";

import React, {useEffect, useState} from 'react';
import {GetBooksByGenre} from "@/network/endpoints/BooksApi";
import {bookInterface} from "@/types/types";
import {IconBook} from "@tabler/icons-react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import BooksGrid from "@/components/pages/shared/BooksGrid";
import Loading from "@/app/(public)/loading";


interface BooksSet {
    books: bookInterface[],
    pagination: {
        current_page: number;
        has_next: boolean;
        has_prev: boolean;
        per_page: number;
        total_books: number;
        total_pages: number;
    }
}

const Page = ({params}: { params: { genre: string } }) => {
    let [currentPage, setCurrentPage] = useState<number>(1);
    const [booksSet, setBooksSet] = useState<BooksSet>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await GetBooksByGenre(params.genre, currentPage);
                setBooksSet(response.data.data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setIsLoading(false);
                console.log("loading done")
            }
        };

        if (params.genre) {
            fetchData();
        }
    }, [params.genre, currentPage]);


    if (isLoading) return <Loading/>;

    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <div className="bg-primary">
                <div className="container text-white font-medium py-4">
                    <span className="flex-row-start gap-x-2">
                    Nous avons {booksSet?.pagination.total_books} livres pour ce genre <IconBook/>
                    </span>
                </div>
            </div>
            <span className="block h-[3px] bg-slate-200"></span>
            <div className="bg-secondary">
                {
                    booksSet?.books ? (
                        <BooksGrid books={booksSet?.books}/>
                    ) : ""
                }
            </div>
            <span className="block h-[3px] bg-slate-200"></span>
            <div className="bg-primary">
                <div className="container py-4 text-white">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem className="cursor-pointer">


                                {
                                    booksSet?.pagination ? booksSet.pagination.current_page > 1 ? (

                                        <PaginationPrevious
                                            onClick={() => setCurrentPage(currentPage = currentPage - 1)}/>

                                    ) : "" : ""
                                }


                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink>
                                    <p className="text-base">
                                        {booksSet?.pagination.current_page}
                                    </p>
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem className="flex-row-start gap-x-2">
                                <PaginationEllipsis/>
                                <p className="text-base">{booksSet?.pagination.total_pages}</p>
                            </PaginationItem>
                            <PaginationItem className="cursor-pointer">
                                {
                                    booksSet?.pagination ? booksSet.pagination.current_page < booksSet.pagination.total_pages ? (

                                        <PaginationNext onClick={() => setCurrentPage(currentPage = currentPage + 1)}/>

                                    ) : "" : ""
                                }
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </>
    );
};

export default Page;
