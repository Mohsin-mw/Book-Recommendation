import React from "react";
import Hero from "@/components/pages/Landing/Hero";
import CTA from "@/components/pages/Landing/CTA";
import {HeroText} from "@/components/pages/Landing/TextGenerated";
import {Typewriter} from "@/components/pages/Landing/Typewriter";
import {Testimonials} from "@/components/pages/Landing/Testimonials";
import FAQ from "@/components/pages/Landing/FAQ";
import Features from "@/components/pages/Landing/Features";
import Footer from "@/components/shared/Footer";

const Page = async () => {

    return (
        <>
            <Hero/>
            <HeroText/>
            <Typewriter/>
            <Testimonials/>
            <FAQ/>
            <Features/>
        </>
    )
}

export default Page;

