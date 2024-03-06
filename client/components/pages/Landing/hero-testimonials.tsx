import React from 'react';
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";


const HeroTestimonials = () => {
    const reviews = [
        {
            description: "A poignant reflection on life's temporality and beauty",
            username: "Johnjames",
            date: "March 6, 2024"
        },
        {
            description: "Captivating exploration of human experience and emotions",
            username: "ThoughtfulReader21",
            date: "March 6, 2024"
        },
        {
            description: "Eloquent prose that transports readers to a world of introspection",
            username: "LiteraryExplorer",
            date: "March 6, 2024"
        }
    ];


    return (
        <div className="lg:w-1/3">
            <Carousel>
                <CarouselContent>
                    {
                        reviews.map((review, i) => (
                            <CarouselItem className="" key={i}>
                                <p className="paragraph-regular pt-8 text-quaternary italic">
                                    {review.description}, <span
                                    className="text-black paragraph-semibold italic">{review.username}</span>
                                </p>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
            </Carousel>
        </div>
    );
};

export default HeroTestimonials;