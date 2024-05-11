import {GetUserFavoriteBooks, GetUserWishList} from "@/network/endpoints/UsersApi";
import {auth} from "@clerk/nextjs";
import {bookInterface} from "@/types/types";
import React from "react";
import FavoriteBooksGrid from "@/components/pages/Favorite/BooksGrid";
import WishListBookGrid from "@/components/pages/WishList/WishListBooksGrid";
const Page = async () => {


    const {userId} = auth();
    const response = await GetUserWishList(userId)
    return (
        <WishListBookGrid favorites={response.data} clerkId={userId}/>
    )
}

export default Page;