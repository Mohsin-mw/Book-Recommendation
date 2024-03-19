"use client";

import React, {useEffect, useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {adminUpdateBook, GetBook} from "@/network/endpoints/BooksApi";
import {bookInterface} from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import {Textarea} from "@/components/ui/textarea";
import {useRouter} from "next/navigation";
import {toast} from "sonner"

const formSchema = z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    genres: z.any().optional()
})


const Page = ({params}: { params: { book: string } }) => {
    const router = useRouter();
    const [book, setBook] = useState<bookInterface>();

    const getBookFromApi = async () => {
        return await GetBook(params.book)
    }

    useEffect(() => {
        const fetchData = async () => {
            const bookResponse = await getBookFromApi();
            setBook(bookResponse.data.book);
        };
        fetchData();
    }, [book]);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: undefined,
            author: undefined,
            description: undefined,
            image: undefined,
            genres: undefined,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        let formData = {...values};

        // Log the value of formData.genres before parsing it
        console.log("Genres before parsing:", formData.genres);

        if (formData.genres && typeof formData.genres === 'string' && formData.genres.trim() !== "") {
            try {
                const genresArray = JSON.parse(formData.genres);
                if (Array.isArray(genresArray)) {
                    formData = {...formData, genres: genresArray};
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            delete formData.genres;
        }

        const res = await adminUpdateBook(book?.id, formData)
        setBook(res.data.data.updated_book)
        toast("Update Successfully");
        form.reset()
        router.refresh()
    }


    return (
        <div>
            {
                book ? (
                    <div className=" bg-primary bg-opacity-10 py-4">
                        <div className="container flex flex-col lg:flex-row items-start justify-start gap-x-4 ">
                            <div className="py-4">
                                <Image
                                    src={book?.image}
                                    width={500}
                                    height={500}
                                    alt="Book"
                                    className="rounded-md object-cover"
                                />
                            </div>
                            <div className="w-full flex-column-start">
                                <h2 className="text-[50px] font-medium">{book.title}</h2>
                                <p className="text-quaternary italic">Author ~ <span
                                    className="not-italic">{book.author}</span>
                                </p>
                                <div className=" hidden md:grid lg:grid-cols-5  gap-y-4 gap-x-4 py-4">
                                    {
                                        book.genres.map((genre, index) => (
                                            <Link
                                                href={`/genre/${genre}`}
                                                className="bg-secondary rounded-full text-tertiary hover:bg-primary hover:text-white cursor-pointer duration-300 text-sm py-1 px-4"
                                                key={index}>{genre}</Link>
                                        ))
                                    }
                                </div>
                                <p className="font-light">{book.description}</p>
                            </div>
                        </div>
                    </div>
                ) : ""
            }

            <div className="bg-white shadow-lg rounded-md p-4">
                <div className="container flex flex-col lg:flex-row items-start justify-start gap-x-4 ">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full space-y-8">
                            <FormField
                                control={form.control}
                                name="image"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Image Url</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://..." {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="title"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Educated" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="author"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Author</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Tara Westover" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="..." {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="genres"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Genres</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Romantic, Fiction, ..." {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Page;

