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
    results: bookInterface[],
    next: string;
    count: number;
    previous: string;
    current_page: number
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
                const response: any = await GetRecommendations(title, currentPage);
                setBooksSet(response);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }

        };

        if (title) {
            fetchData();
        }
    }, [title, currentPage]);

    if (isLoading) return <Loading/>;

    if (error) return <p>Erreur: {error}</p>;

    return (
        <>
            <div>
                {
                    booksSet?.results ? (
                        <BooksGrid books={booksSet?.results}/>
                    ) : ""
                }
            </div>
            <div className="bg-primary">
                <div className="container py-4 text-white">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem className="cursor-pointer">


                                {
                                    booksSet?.previous ?  (

                                        <PaginationPrevious
                                            onClick={() => setCurrentPage(currentPage = currentPage - 1)}/>

                                    ) : ""
                                }


                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink>
                                    <p className="text-base">
                                        {booksSet?.current_page}
                                    </p>
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem className="flex-row-start gap-x-2">
                                <PaginationEllipsis/>
                                <p className="text-base">3</p>
                            </PaginationItem>
                            <PaginationItem className="cursor-pointer">
                                {
                                    booksSet?.next ?  (

                                        <PaginationNext onClick={() => setCurrentPage(currentPage = currentPage + 1)}/>

                                    ) : ""
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