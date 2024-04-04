import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const HeroTestimonials = () => {
  const reviews = [
    {
      description:
        "Un livre est une fenêtre par laquelle on s'évade",
      username: "Julien Green",
      date: "6 mars 2024",
    },
    {
      description:
        "Exploration captivante de l'expérience humaine et des émotions",
      username: "ThoughtfulReader21",
      date: "6 mars 2024",
    },
    {
      description:
        "Prose éloquente qui transporte les lecteurs dans un monde d'introspection",
      username: "LiteraryExplorer",
      date: "6 mars 2024",
    },
  ];

  return (
    <div className="lg:w-1/3">
      <Carousel>
        <CarouselContent>
          {reviews.map((review, i) => (
            <CarouselItem className="" key={i}>
              <p className="paragraph-regular pt-8 hidden md:inline-block text-quaternary italic">
                {review.description},{" "}
                <span className="text-black paragraph-semibold italic">
                  {review.username}
                </span>
              </p>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default HeroTestimonials;
