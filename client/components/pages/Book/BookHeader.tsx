"use client";

import {Button} from "@/components/ui/button";
import React from "react";
import {bookInterface} from "@/types/types";
import {AddBookToWishList, AddUserFavoriteBook} from "@/network/endpoints/UsersApi";
import {toast} from "sonner";


const BookHeader = ({book, userId}: { book: bookInterface, userId?: string | null }) => {


    const handleBookClick = async () => {
        if (userId) {
            try {
                const response = await AddUserFavoriteBook(userId, book.id);
                toast("Book Added To Favorites")
            } catch (e: any) {
                toast("Something Went Wrong")
            }

        }
    }

    const handleWishListClick = async () => {
        if (userId) {
            try {
                const response = await AddBookToWishList(userId, book.id);
                toast("Book Added To WishList")
            } catch (e: any) {
                toast("Something Went Wrong")
            }

        }
    }

    return (
        <div
            className="py-4 flex-column-start ">
            <h2 className="text-[50px] font-medium">{book.title}</h2>
            <div className={"flex-row-start gap-x-4"}>
                {
                    userId ?
                        <Button onClick={handleBookClick}>Ajouter aux favoris</Button>
                        : ""
                }
                {
                    userId ?
                        <Button onClick={handleWishListClick}>Add to WishList</Button>
                        : ""
                }
            </div>
        </div>
    )
}

export default BookHeader;