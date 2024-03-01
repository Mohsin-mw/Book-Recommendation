import Container from "@/components/shared/Container/Container";
import React from "react";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const Blogs = () => {
  const blogs = [
    {
      subtitle: "Ipsum",
      title: "Varius est diam",
      image: "/assets/temp/blog.png",
    },
    {
      subtitle: "Ipsum",
      title: "Varius est diam",
      image: "/assets/temp/blog.png",
    },
    {
      subtitle: "Ipsum",
      title: "Varius est diam",
      image: "/assets/temp/blog.png",
    },
    {
      subtitle: "Ipsum",
      title: "Varius est diam",
      image: "/assets/temp/blog.png",
    },
  ];

  return (
    <div className="bg-primary-500">
      <Container>
        <div className="py-4">
          <h4 className="h3-bold inline-block border-b-4 border-primary-500 py-2">
            Recent Blogs
          </h4>
        </div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {blogs.map((element, index) => (
              <CarouselItem
                key={index}
                className="mx-4 overflow-hidden rounded-md bg-white p-4 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card className="relative">
                    <h3 className="base-bold">{element.subtitle}</h3>
                    <h2 className="h3-bold py-1">{element.title}</h2>
                    <Image
                      src={element.image}
                      width={200}
                      height={200}
                      className="select-none bg-cover object-cover"
                      alt="book category"
                    />
                  </Card>
                </div>
                <p className="text-primary-500">View</p>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="rounded-full bg-primary-500 text-white" />
          <CarouselNext className="rounded-full bg-primary-500 text-white" />
        </Carousel>
      </Container>
    </div>
  );
};

export default Blogs;
