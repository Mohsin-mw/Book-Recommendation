import React from "react";
import Image from "next/image";
import {GetBook} from "@/network/endpoints/BooksApi";
import {bookInterface} from "@/types/types";
import {AxiosAdapter} from "axios";
import Recommendations from "@/components/pages/Book/Recommendations";
import BookHeader from "@/components/pages/Book/BookHeader";
import {auth} from "@clerk/nextjs";
import Comments from "@/components/pages/Book/Comments";
import BookImage from "@/components/pages/Book/BookImage";

const Page = async ({params}: { params: { book: string } }) => {
    const response = await GetBook(params.book);
    const book = response.data.result
    const finalBook = book[0]
    const {userId} = auth();

    return (
        <div>
            <div className="text-black bg-primary bg-opacity-10">
                <div className="container flex flex-col lg:flex-row items-start justify-start gap-x-4 ">
                    <div className="py-4">

                        <BookImage image={finalBook.image} />
                    </div>
                    <div className="w-full flex-column-start">
                        <BookHeader book={finalBook} userId={userId}/>
                        <span className={"w-full bg-gray-300 h-[2px]"}/>
                        <div className={"grid grid-cols-2 gap-x-4 py-4"}>
                            <p className="text-quaternary italic">Author ~ <span
                                className="not-italic">{finalBook.author}</span>
                            </p>
                            <p className="text-quaternary italic">ISBN ~ <span className="not-italic">{finalBook.isbn}</span>
                            </p>

                        </div>
                        <span className={"w-full bg-gray-300 h-[2px]"}/>
                        <p className="font-light py-4">{finalBook.description}</p>
                    </div>
                </div>
            </div>
            <span className="block h-[3px] bg-slate-200"></span>
            <div className="bg-primary">
                <div className="container text-white font-bold py-4">
                    Recommendations for ~ {finalBook.title}
                </div>
            </div>
            <span className="block h-[3px] bg-slate-200"></span>
            <Recommendations title={finalBook.title}/>
            <Comments bookId={finalBook.id}/>
        </div>
    );
};

export default Page;
