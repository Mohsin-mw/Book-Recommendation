import Link from "next/link";
import Image from "next/image";
import React from "react";
import {bookInterface} from "@/types/types";


const BooksGrid = ({books, gridSize, url}: { books: bookInterface[], url?: "admin" | "public", gridSize?: number }) => {
    return (
        <div
            className={`container py-8 grid grid-cols-1 md:grid-cols-3 ${gridSize ? `lg:grid-cols-${gridSize}` : "lg:grid-cols-4"} gap-x-4 gap-y-8`}>
            {
                books.map((book, index) => (
                    <Link
                        href={url == "admin" ? `/admin-books/${encodeURIComponent(book.title)}` : `/book/${encodeURIComponent(book.title)}`}
                        key={index}
                        className="bg-white rounded-md shadow-lg flex-column-start hover:scale-105 duration-200">
                        <Image className="object-cover w-full md:h-96  rounded-md overflow-hidden"
                               src={book.image}
                               width={270}
                               height={200}
                               alt={book.title}/>
                        <span className="block h-[3px] bg-slate-200"></span>
                        <h2 className="text-base line-clamp-2 font-medium pt-4 px-2">{book.title}</h2>
                        <p className="text-quaternary italic px-2 pb-1">Author ~ <span
                            className="not-italic">{book.author}</span>
                        </p>
                    </Link>
                ))
            }
        </div>
    )
}

export default BooksGrid;