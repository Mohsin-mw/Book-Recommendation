import React from "react";
import Search from "@/components/pages/Landing/Search";
import HeroTestimonials from "@/components/pages/Landing/hero-testimonials";

const Hero = () => {
    return (
        <div className="bg-hero bg-cover bg-no-repeat">
            <div className="container py-12 lg:py-24">
                <h1 className="font-bold text-gray-900 text-center md:text-left md:w-2/3 text-2xl md:text-2xl  lg:w-2/3 lg:text-7xl">
                    Find the book you’re looking for easier to read.
                </h1>
                <p className="paragraph-regular py-4 text-quaternary">
                    The most appropriate book site to reach books
                </p>
                <Search/>
                <HeroTestimonials/>
            </div>
        </div>
    );
};

export default Hero;
