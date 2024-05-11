import {GetTopRatedBooks} from "@/network/endpoints/BooksApi";
import {bookInterface} from "@/types/types";
import {InfiniteMovingBooks} from "@/components/ui/infinite-moviing-books";


const TopRatedBooks = async () => {
    const response = await GetTopRatedBooks();
    const top_rated_books: bookInterface[] = response.data.result;
    return (<div>
        <div
            className="h-[20rem] rounded-md flex flex-col antialiased bg-primary bg-opacity-5 dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
            <InfiniteMovingBooks
                books={top_rated_books}
                direction="left"
                speed="slow"
            />
        </div>
    </div>)
}


export default TopRatedBooks;

// TOP RATED BOOK API DONE