import {SignUp} from "@clerk/nextjs";

const Page = () => {
    return (
        <div className="bg-primary flex-column-center h-screen">
            <SignUp afterSignUpUrl="/auth"/>
        </div>
    )
}

export default Page;