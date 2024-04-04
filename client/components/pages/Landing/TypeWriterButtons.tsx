import React from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const TypeWriterButtons = () => {
    return (
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
            <Button
                className="w-40 h-10 rounded-full bg-primary border dark:border-white border-transparent text-white text-sm">
                Explorer
            </Button>
            <Link href={"/sign-up"}>
                <Button
                    className="w-40 h-10 rounded-full bg-white hover:text-white text-primary border border-primary  text-sm">
                    S&apos;incrire
                </Button>
            </Link>
        </div>
    )
}

export default TypeWriterButtons;