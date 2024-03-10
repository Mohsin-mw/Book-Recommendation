"use client"

import React, {useEffect, useState} from 'react';
import {GetRecommendations} from "@/network/endpoints/BooksApi";
import {bookInterface} from "@/types/types";
import BooksGrid from "@/components/pages/shared/BooksGrid";
import Loading from "@/app/(public)/loading";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"


interface BooksSet {
    books: bookInterface[],
    pagination: {
        current_page: number;
        per_page: number;
        total_books: number;
        total_pages: number;
    }
}


const Recommendations = ({title}: { title: string }) => {
    let [currentPage, setCurrentPage] = useState<number>(1);
    const [booksSet, setBooksSet] = useState<BooksSet>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await GetRecommendations(title, currentPage);
                setBooksSet(response.data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setIsLoading(false);
                console.log("loading done")
            }

        };

        if (title) {
            fetchData();
        }
    }, [title, currentPage]);

    if (isLoading) return <Loading/>;

    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <div>
                {
                    booksSet?.books ? (
                        <BooksGrid books={booksSet?.books}/>
                    ) : ""
                }
            </div>
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

export default Recommendations;