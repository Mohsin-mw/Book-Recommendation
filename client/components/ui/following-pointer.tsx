export function BlogCard({title, description, date, link}: {
    title: string,
    description: string,
    date: string,
    link: string
}) {
    return (
        <div className="w-80 mx-auto">
            <div
            >
                <div
                    className="relative overflow-hidden h-full rounded-2xl transition duration-200 group bg-white hover:shadow-xl border border-zinc-100">
                    <div
                        className="w-full aspect-w-16 aspect-h-10 bg-gray-100 rounded-tr-lg rounded-tl-lg overflow-hidden xl:aspect-w-16 xl:aspect-h-10 relative">

                    </div>
                    <div className=" p-4">
                        <h2 className="font-bold my-4 text-lg text-zinc-700">
                            {title}
                        </h2>
                        <h2 className="font-normal my-4 text-sm text-zinc-500">
                            {description}
                        </h2>
                        <div className="flex flex-row justify-between items-center mt-10">
                            <span className="text-sm text-gray-500">{date}</span>
                            <a
                                href={link}
                                target={"_blank"}
                                className=" bg-primary relative z-10 px-6 py-2  text-white font-bold rounded-xl block text-xs">
                                Read More
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
