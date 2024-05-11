import {GetUserFavoriteBooks} from "@/network/endpoints/UsersApi";
import {auth} from "@clerk/nextjs";
import {bookInterface} from "@/types/types";
import React from "react";
import FavoriteBooksGrid from "@/components/pages/Favorite/BooksGrid";

const Page = async () => {


    const {userId} = auth();
    const response = await GetUserFavoriteBooks(userId)
    return (
        <FavoriteBooksGrid favorites={response.data} clerkId={userId}/>
    )
}

export default Page;