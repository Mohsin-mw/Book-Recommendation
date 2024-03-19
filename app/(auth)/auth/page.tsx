import {auth, clerkClient} from '@clerk/nextjs';
import {RegisterUser} from "@/network/endpoints/UsersApi";
import {redirect} from 'next/navigation'

const Page = async () => {
    const {userId} = await auth();
    if (typeof userId === "string") {
        try {
            const user = await clerkClient.users.getUser(userId);
            const userEmail = user.emailAddresses[0].emailAddress;
            await RegisterUser({username: userEmail, clerk_id: userId});
        } catch (e) {
            redirect("/")
        }
    }
    redirect("/")
    return (<div></div>)
}

export default Page;