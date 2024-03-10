import {SignIn} from "@clerk/nextjs";

const Page = async () => {

    return (
        <div className="bg-primary h-screen flex-column-center">
            <SignIn appearance={{
                variables: {colorPrimary: "#D7A079"}
            }} afterSignInUrl="/auth"/>
        </div>
    )
}

export default Page;