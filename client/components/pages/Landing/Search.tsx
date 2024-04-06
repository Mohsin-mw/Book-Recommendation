"use client";

import React, {useState} from "react";
import Link from "next/link";
import {Input} from "@/components/ui/input";
import {BiSearch} from "react-icons/bi";
import {Button} from "@/components/ui/button";
import {queryInterface} from "@/types/types";
import {QueryBooks} from "@/network/endpoints/BooksApi";
import RequestBook from "@/components/pages/Landing/RequestBook";

const Search = () => {
    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false)

    const [suggestions, setSuggestions] = useState<queryInterface>();
    const handleChange = async (event: { target: { value: string; }; }) => {
        const newQuery = event.target.value;
        setQuery(newQuery);
        try {
            const response = await QueryBooks(newQuery);
            setSuggestions(response.data);
        } catch (error) {
        }
        if (newQuery == "") {
            setSuggestions(undefined)
        }
    };


    return (
        <>
            <div
                className="my-2 inline-block rounded-full border-primary-500  lg:bg-white py-2 lg:pl-4 pr-4 drop-shadow-2xl  relative z-50 w-full md:w-auto ">
                <div
                    id="#searchSection"
                    className="flex-column-center inline-block md:flex-row lg:flex-row-start xl:flex-row-start gap-y-4">
                    <div className="relative w-full">
                        <Input
                            type="email"
                            placeholder="Find your favorite book here..."
                            className="w-full lg:w-96 border-2 text-[14px]   rounded-full bg-gray-50 py-6 font-medium text-gray-900  placeholder:text-gray-400 focus:ring-primary active:ring-primary focus-visible:ring-primary ring-1 ring-primary no-focus"
                            value={query}
                            onChange={handleChange}
                        />
                        <div
                            className="bg-primary inline-block p-2 rounded-full text-white absolute right-2 top-1/2 -translate-y-1/2 md:hidden">
                            <BiSearch/></div>
                    </div>
                    <Button
                        className="my-2 rounded-full px-8 py-6 text-white bg-[#E8BA96] lg:ml-4 hidden md:flex-row-start">
                        Search
                        <BiSearch size={20} className="ml-2"/>
                    </Button>
                </div>
                {
                    suggestions?.books ? (
                        <div
                            className="absolute w-full bg-white rounded-md shadow-light100 top-[110%] overflow-hidden ">
                            <div className={"px-4 flex-column-start"}>
                                {
                                    suggestions.books.map((book, i) => (
                                        <Link
                                            key={i}
                                            className="py-2 border-b-2 hover:border-b-primary duration-200 text-[14px] hover:text-[15px] w-full group text-gray-900"
                                            href={`/book/${encodeURIComponent(book.isbn)}`}>{book.title}<span
                                            className="text-quaternary text-sm opacity-0 group-hover:opacity-100 duration-200"> ~ Author: {book.author}</span></Link>
                                    ))
                                }
                            </div>
                            <div
                                onClick={() => setOpen(!open)}
                                className={"py-2 px-4 cursor-pointer border-b-2 hover:border-b-primary duration-200 text-white bg-primary text-[14px] hover:text-[15px] w-full"}>Request
                                New Book
                            </div>
                        </div>
                    ) : ""
                }
                <RequestBook open={open} setOpen={setOpen}/>
            </div>
        </>
    )
}

export default Search;