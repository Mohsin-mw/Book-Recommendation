import {getCommentsByBook} from "@/network/endpoints/BooksApi";
import {UserCommentSection} from "@/components/pages/Book/UserComment";
import {auth, clerkClient} from "@clerk/nextjs";


interface commentInterface {
    "book_id": number,
    "comment_id": number,
    "comment_text": string,
    "timestamp": string,
    "user_id": string,
    "user_name": string
}

const Comments = async ({bookId}: { bookId: number }) => {
    const {data} = await getCommentsByBook(bookId)
    const {comments}: { comments: commentInterface[] } = data.data
    const {userId} = auth();
    let email: string = "";
    if (typeof userId === "string") {
        const user = await clerkClient.users.getUser(userId);
        const userEmail = user.emailAddresses[0].emailAddress;
        email = userEmail
    }

    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();

        const isToday = date.getDate() === now.getDate() &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear();

        if (isToday) {
            return date.toLocaleTimeString();
        } else {
            return date.toLocaleString();
        }
    };

    return (
        <div className="container py-8 flex-column-start gap-y-4">
            {
                userId ? (
                    <UserCommentSection book_id={bookId} user_id={userId} user_name={email}/>
                ) : ""
            }
            {
                comments ? (
                    comments.map((comment, index) => (
                        <div key={index} className="flex-column-start border-b-2 w-full">
                            <div className="flex-row-start gap-x-2">
                                <span className="text-tertiary font-bold">{comment.user_name}</span>
                                ~ <span className="text-gray-400">{formatTimestamp(comment.timestamp)}</span>
                            </div>
                            <div>
                                <p className="py-1">
                                    {comment.comment_text}
                                </p>
                            </div>
                        </div>
                    ))
                ) : ""
            }
        </div>
    )
}

export default Comments;