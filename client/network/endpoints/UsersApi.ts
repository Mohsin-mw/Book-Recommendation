import {axiosClient} from "../apiClient";

type registerUser = {
    username: string;
    clerk_id: string;
};


export async function RegisterUser(data: registerUser) {
    return await axiosClient().post("http://localhost:8000/api/users/", {
        "username": data.username,
        "clerk_id": data.clerk_id
    });
}

// USERS, COMMENTS, WISHLIST, FAVORITES, REQUEST BOOK ( D_O_N_E )

export async function AddUserFavoriteBook(id: string, bookId: number) {
    return await axiosClient().post("http://localhost:8000/api/favorites", {
        "user": id,
        "book": bookId
    });
}

export async function AddBookToWishList(id: string, bookId: number) {
    return await axiosClient().post("http://localhost:8000/api/wishList", {
        "user_id": id,
        "book": bookId
    });
}

export async function GetUserFavoriteBooks(id: string | null) {
    return await axiosClient().get(`http://localhost:8000/api/favorites-by-user?clerk_id=${id}`);
}


export async function GetUserWishList(id: string | null) {
    return await axiosClient().get(`http://localhost:8000/api/wish-by-user?clerk_id=${id}`)
}

export async function RemoveWishListBooks(clerkId: string | null, bookId: number) {
    return await axiosClient().delete("http://localhost:8000/api/wishList/delete/", {
        data: {
            "user_id": clerkId,
            "wishList_id": bookId
        }
    });
}

export async function RemoveFavoriteBooks(clerkId: string | null, bookId: number) {
    return await axiosClient().delete("http://localhost:8000/api/favorites-by-user/delete/", {
        data: {
            "user_id": clerkId,
            "favorite_id": bookId
        }
    });
}


// DELETE WISH LIST BOOKS