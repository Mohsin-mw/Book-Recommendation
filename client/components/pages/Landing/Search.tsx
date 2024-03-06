"use client";

import React from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {BiSearch} from "react-icons/bi";

const Search = () => {
    return (
        <>
            <div
                className="my-2 inline-block rounded-full border-primary-500  lg:bg-white py-2 lg:pl-4 pr-4 drop-shadow-2xl  relative z-50">
                <div className="flex-col md:flex-row lg:flex-row-start xl:flex-row-start gap-y-4">
                    <Input
                        type="email"
                        placeholder="Find your favorite book here..."
                        className="w-full lg:w-96 border-2   rounded-full bg-gray-50 py-6 font-bold text-gray-900  placeholder:text-gray-400 focus:ring-transparent"
                    />
                    <Button className="my-2 rounded-full px-8 py-6 text-white  bg-[#E8BA96] lg:ml-4">
                        Search
                        <BiSearch size={20} className="ml-2"/>
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Search;