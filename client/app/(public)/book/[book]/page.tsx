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
            <div className=" bg-primary bg-opacity-10">
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
                        <p className="text-quaternary italic">Author ~ <span className="not-italic">{book.author}</span>
                        </p>
                        <div className=" hidden md:grid lg:grid-cols-5  gap-y-4 gap-x-4 py-4">
                            {
                                book.genres.map((genre, index) => (
                                    <Link
                                        href={`/genre/${genre}`}
                                        className="bg-secondary rounded-full text-tertiary hover:bg-primary hover:text-white cursor-pointer duration-300 text-sm py-1 px-4"
                                        key={index}>{genre}</Link>
                                ))
                            }
                        </div>
                        <p className="font-light">{book.description}</p>
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
