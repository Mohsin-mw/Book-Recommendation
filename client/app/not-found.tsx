import Link from "next/link";

const NotFound = () => {
    return (
        <div className="bg-primary text-white h-screen flex-column-center">
            <h3 className="text-4xl font-bold">Oops!</h3>
            <p className="pt-2">Cette page n&apos;existe pas ...</p>
            <Link className="underline text-sm py-4" href={"/"}>Revenir à la page d&apos;accueil</Link>
        </div>
    )
}

export default NotFound;