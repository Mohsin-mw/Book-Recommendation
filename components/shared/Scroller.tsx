"use client";

import {ChevronUp} from "lucide-react";
import React from "react";

const Scroller = (): React.JSX.Element => {
    const isBrowser = () => typeof window !== 'undefined';

    function scrollToTop() {
        if (!isBrowser()) return;
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    return (
        <span
            className={" flex-column-center fixed bottom-8 right-12 inline-block h-[40px] w-[40px] cursor-pointer rounded-full bg-primary text-white"}
            onClick={scrollToTop}>
        <div className={"flex-column-center relative"}>
            <ChevronUp size={"24"} className={"z-10"}/>
        </div>
    </span>)
}

export default Scroller;