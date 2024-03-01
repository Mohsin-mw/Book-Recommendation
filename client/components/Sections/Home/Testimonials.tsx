import Container from "@/components/shared/Container/Container";
import React from "react";
import { Card, CardDescription } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const Testimonials = () => {
  const testimonials = [
    {
      author: "Tara Westover",
      title: "Educated",
      image: "/assets/temp/bookcover.png",
      description:
        "Purus maecenas quis elit eu, aliquet. Tellus porttitor ut sollicitudin sit non fringilla. Quam nunc volutpat senectus neque eget amet pharetra, euismod. Tempus, nunc, molestie imperdiet curabitur commodo euismod.",
      userPicture: "/assets/temp/user.png",
      userName: "Jane Cooper",
    },
    {
      author: "Tara Westover",
      title: "Educated",
      image: "/assets/temp/bookcover.png",
      description:
        "Purus maecenas quis elit eu, aliquet. Tellus porttitor ut sollicitudin sit non fringilla. Quam nunc volutpat senectus neque eget amet pharetra, euismod. Tempus, nunc, molestie imperdiet curabitur commodo euismod.",
      userPicture: "/assets/temp/user.png",
      userName: "Jane Cooper",
    },
    {
      author: "Tara Westover",
      title: "Educated",
      image: "/assets/temp/bookcover.png",
      description:
        "Purus maecenas quis elit eu, aliquet. Tellus porttitor ut sollicitudin sit non fringilla. Quam nunc volutpat senectus neque eget amet pharetra, euismod. Tempus, nunc, molestie imperdiet curabitur commodo euismod.",
      userPicture: "/assets/temp/user.png",
      userName: "Jane Cooper",
    },
    {
      author: "Tara Westover",
      title: "Educated",
      image: "/assets/temp/bookcover.png",
      description:
        "Purus maecenas quis elit eu, aliquet. Tellus porttitor ut sollicitudin sit non fringilla. Quam nunc volutpat senectus neque eget amet pharetra, euismod. Tempus, nunc, molestie imperdiet curabitur commodo euismod.",
      userPicture: "/assets/temp/user.png",
      userName: "Jane Cooper",
    },
  ];

  return (
    <Container>
      <div className="py-8">
        <h4 className="h3-bold inline-block border-b-4 border-primary-500 py-2">
          Testimonials
        </h4>
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {testimonials.map((element, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 ">
              <Card className="relative rounded-md drop-shadow-xl">
                <div className="flex-start">
                  <Image
                    src={element.image}
                    width={100}
                    height={100}
                    alt="book image"
                  />
                  <div>
                    <h3 className="h3-bold">{element.title}</h3>
                    <p className="paragraph-semibold">{element.author}</p>
                  </div>
                </div>
                <CardDescription className="px-2 py-4">
                  {element.description}
                </CardDescription>

                <div className="flex-start gap-x-2 py-4">
                  <Image
                    src={element.userPicture}
                    width={30}
                    height={30}
                    alt="book image"
                  />
                  <p className="paragraph-semibold">{element.userName}</p>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="rounded-full bg-primary-500 text-white" />
        <CarouselNext className="rounded-full bg-primary-500 text-white" />
      </Carousel>
    </Container>
  );
};

export default Testimonials;
