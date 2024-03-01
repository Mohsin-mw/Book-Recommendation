import Container from "@/components/shared/Container/Container";
import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const BookCategories = () => {
  const bookcategories = [
    {
      subCat: "Pottery",
      category: "Vases Family",
      image: "/assets/temp/bookcategory1.png",
    },
    {
      subCat: "Oil Painting",
      category: "Camel Portrait",
      image: "/assets/temp/bookcategory2.png",
    },
    {
      subCat: "Abstract Painting",
      category: "Euforia",
      image: "/assets/temp/bookcategory3.png",
    },
    {
      subCat: "Object Design",
      category: "Classic Watch",
      image: "/assets/temp/bookcategory4.png",
    },
  ];
  return (
    <Container>
      <div className="py-8">
        <h4 className="h3-bold inline-block border-b-4 border-primary-500 py-2">
          Top 10 Rated Book
        </h4>
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {bookcategories.map((element, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="relative">
                  <Image
                    src={element.image}
                    width={500}
                    height={300}
                    className="select-none bg-cover object-cover"
                    alt="book category"
                  />
                  <div className="absolute left-0 top-0 text-left text-white">
                    <CardHeader>
                      <CardTitle>{element.subCat}</CardTitle>
                      <CardTitle className="h3-semibold">
                        {element.category}
                      </CardTitle>
                    </CardHeader>
                  </div>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="rounded-full bg-primary-500 text-white" />
        <CarouselNext className="rounded-full bg-primary-500 text-white" />
      </Carousel>
    </Container>
  );
};

export default BookCategories;
