import React from "react";
import Hero from "@/components/pages/Landing/Hero";
import {HeroText} from "@/components/pages/Landing/TextGenerated";
import {Typewriter} from "@/components/pages/Landing/Typewriter";
import {Testimonials} from "@/components/pages/Landing/Testimonials";
import FAQ from "@/components/pages/Landing/FAQ";
import TopRatedBooks from "@/components/pages/Landing/TopRatedBooks";
import Blogs from "@/components/pages/Landing/Blogs";

const Page = async () => {
    return (
        <>
            <Hero/>
            <HeroText/>
            <TopRatedBooks/>
            <Typewriter/>
            <Testimonials/>
            <FAQ/>
            <Blogs/>
        </>
    );
};

export default Page;
