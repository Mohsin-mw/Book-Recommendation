import Link from "next/link";

const NotFound = () => {
    return (
        <div className="bg-primary text-white h-screen flex-column-center">
            <h3 className="text-4xl font-bold">Oops!</h3>
            <p className="pt-2">Page not found</p>
            <Link className="underline text-sm py-4" href={"/"}>Go back home</Link>
        </div>
    )
}

export default NotFound;