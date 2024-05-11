"use client";
import Link from "next/link";
import Image from "next/image";
import React, {useEffect} from "react";
import {bookInterface} from "@/types/types";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {RemoveFavoriteBooks} from "@/network/endpoints/UsersApi";
import {toast} from "sonner";

type favoritesResponse = {
    id: number,
    book: bookInterface
}

const FavoriteBooksGrid = ({favorites, clerkId}: { favorites: favoritesResponse[], clerkId: string | null }) => {
    const router = useRouter();
    useEffect(() => {
        router.refresh();
    }, [])

    const handleBookRemove = async (commentId: number) => {
        const response = await RemoveFavoriteBooks(clerkId, commentId)
        router.refresh();
        toast("Book Removed Successfully")
    }


    return (
        <div className="h-screen">
            <div className="container py-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                {
                    favorites.map((book, index) => (
                        <div key={index}
                             className="bg-white rounded-md shadow-lg flex-column-start duration-200">
                            <Image className="object-cover w-full md:h-96  rounded-md overflow-hidden"
                                   src={book.book.image}
                                   width={270}
                                   height={200}
                                   alt={book.book.title}/>
                            <span className="block h-[3px] bg-slate-200"></span>
                            <h2 className="text-base line-clamp-2 font-medium pt-4 px-2">{book.book.title}</h2>
                            <p className="text-quaternary italic px-2 pb-1">Auteur ~ <span
                                className="not-italic">{book.book.author}</span>
                            </p>
                            <Link href={`/book/${encodeURIComponent(book.book.isbn)}`}>
                                <Button className="my-2 mx-2">En Savoir Plus</Button>
                            </Link>
                            <Button onClick={() => handleBookRemove(book.id)}
                                    className="my-2 mx-2 bg-secondary text-primary">Supprimer</Button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default FavoriteBooksGrid;