import {axiosClient} from "../apiClient";

type registerUser = {
    username: string;
    clerk_id: string;
};


export async function RegisterUser(data: registerUser) {
    return await axiosClient().post("/users", {
        "username": data.username,
        "clerk_id": data.clerk_id
    });
}

export async function AddUserFavoriteBook(id: string, bookId: number) {
    return await axiosClient().post("/favorite", {
        "clerk_id": id,
        "book_id": bookId
    });
}

export async function AddBookToWishList(id: string, bookId: number) {
    return await axiosClient().post("/wishList", {
        "clerk_id": id,
        "book_id": bookId
    });
}

export async function GetUserFavoriteBooks(id: string | null) {
    return await axiosClient().post("/favoritesList", {
        "clerk_id": id,
    }, {
        headers: {
            'Cache-Control': "no-cache, no-store, must-revalidate"
        }
    });
}


export async function GetUserWishList(id: string | null) {
    return await axiosClient().post("/userWishList", {
        "clerk_id": id,
    }, {
        headers: {
            'Cache-Control': "no-cache, no-store, must-revalidate"
        }
    });
}


export async function RemoveFavoriteBooks(clerkId: string | null, bookId: number) {
    return await axiosClient().delete("/favoritesList", {
        data: {
            "clerk_id": clerkId,
            "book_id": bookId
        }
    });
}


// DELETE WISH LIST BOOKS