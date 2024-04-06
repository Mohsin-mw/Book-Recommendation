import React from "react";
import Search from "@/components/pages/Landing/Search";
import HeroTestimonials from "@/components/pages/Landing/hero-testimonials";

const Hero = () => {
    return (
        <div className="bg-hero bg-cover bg-no-repeat">
            <div className="container py-12 lg:py-24">
                <h1 className="font-bold text-gray-900 text-center md:text-left md:w-2/3 text-2xl md:text-2xl  lg:w-2/3 lg:text-7xl">
                    Trouvez dès maintenant votre prochain livre à lire.
                </h1>
                <p className="paragraph-regular py-4 text-quaternary">
                    Le site conçu pour les lecteurs avides de découvertes littéraires.
                </p>
                <Search/>
                <HeroTestimonials/>
            </div>
        </div>
    );
};

export default Hero;
