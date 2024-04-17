import {GetUserFavoriteBooks, GetUserWishList} from "@/network/endpoints/UsersApi";
import {auth} from "@clerk/nextjs";
import {bookInterface} from "@/types/types";
import React from "react";
import FavoriteBooksGrid from "@/components/pages/Favorite/BooksGrid";

const Page = async () => {


    const {userId} = auth();
    const response = await GetUserWishList(userId)
    const {whish_list}: { whish_list: bookInterface[] } = response.data
    return (
        <FavoriteBooksGrid favorites={whish_list} clerkId={userId}/>
    )
}

export default Page;