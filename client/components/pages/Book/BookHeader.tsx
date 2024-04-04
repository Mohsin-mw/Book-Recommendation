"use client";

import {Button} from "@/components/ui/button";
import React from "react";
import {bookInterface} from "@/types/types";
import {AddUserFavoriteBook} from "@/network/endpoints/UsersApi";
import {toast} from "sonner";


const BookHeader = ({book, userId}: { book: bookInterface, userId?: string | null }) => {


    const handleBookClick = async () => {
        if (userId) {
            try {
                const response = await AddUserFavoriteBook(userId, book.id);
                toast(response.data.message)
            } catch (e: any) {
                toast(e.response.data.message)
            }

        }
    }

    return (
        <div
            className="py-4 flex-column-start ">
            <h2 className="text-[50px] font-medium">{book.title}</h2>
            {
                userId ?
                    <Button onClick={handleBookClick}>Ajouter aux favoris</Button>
                    : ""
            }
        </div>
    )
}

export default BookHeader;