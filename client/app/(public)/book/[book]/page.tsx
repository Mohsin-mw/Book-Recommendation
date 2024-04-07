import React from "react";
import Image from "next/image";
import Link from "next/link";
import {GetBook} from "@/network/endpoints/BooksApi";
import {bookInterface} from "@/types/types";
import {AxiosAdapter} from "axios";
import Recommendations from "@/components/pages/Book/Recommendations";
import BookHeader from "@/components/pages/Book/BookHeader";
import {auth} from "@clerk/nextjs";
import Comments from "@/components/pages/Book/Comments";

const Page = async ({params}: { params: { book: string } }) => {
    const response = await GetBook(params.book);
    const {book, error}: { book: bookInterface, error: AxiosAdapter } = response.data
    const {userId} = auth();
    return (
        <div>
            <div className="text-black bg-primary bg-opacity-10">
                <div className="container flex flex-col lg:flex-row items-start justify-start gap-x-4 ">
                    <div className="py-4">
                        <Image
                            src={book.image}
                            width={500}
                            height={500}
                            alt="Book"
                            className="rounded-md object-cover"
                        />
                    </div>
                    <div className="w-full flex-column-start">
                        <BookHeader book={book} userId={userId}/>
                        <span className={"w-full bg-gray-300 h-[2px]"}/>
                        <div className={"grid grid-cols-2 gap-x-4 py-4"}>
                            <p className="text-quaternary italic">Author ~ <span
                                className="not-italic">{book.author}</span>
                            </p>
                            <p className="text-quaternary italic">ISBN ~ <span className="not-italic">{book.isbn}</span>
                            </p>
                            <p className="text-quaternary italic">Pages ~ <span
                                className="not-italic">{book.pages}</span>
                            </p>
                            <p className="text-quaternary italic">Publication Date ~ <span
                                className="not-italic">{book.publication}</span>
                            </p>
                        </div>
                        <span className={"w-full bg-gray-300 h-[2px]"}/>
                        <p className="font-light py-4">{book.description}</p>
                    </div>
                </div>
            </div>
            <span className="block h-[3px] bg-slate-200"></span>
            <div className="bg-primary">
                <div className="container text-white font-bold py-4">
                    Recommendations for ~ {book.title}
                </div>
            </div>
            <span className="block h-[3px] bg-slate-200"></span>
            <Recommendations title={book.title}/>
            <Comments bookId={book.id}/>
        </div>
    );
};

export default Page;
