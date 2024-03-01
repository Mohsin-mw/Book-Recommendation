import React from "react";
import Container from "@/components/shared/Container/Container";
import { HiHome } from "react-icons/hi";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const page = () => {
  const books = [
    {
      title: "The Hunger games",
      author: "Suzanne Collins",
      image: "/assets/temp/searchbook.png",
    },
    {
      title: "The Hunger games",
      author: "Suzanne Collins",
      image: "/assets/temp/searchbook.png",
    },
    {
      title: "The Hunger games",
      author: "Suzanne Collins",
      image: "/assets/temp/searchbook.png",
    },
    {
      title: "The Hunger games",
      author: "Suzanne Collins",
      image: "/assets/temp/searchbook.png",
    },
    {
      title: "The Hunger games",
      author: "Suzanne Collins",
      image: "/assets/temp/searchbook.png",
    },
    {
      title: "The Hunger games",
      author: "Suzanne Collins",
      image: "/assets/temp/searchbook.png",
    },
  ];
  return (
    <div>
      <div className="bg-primary-500 py-16">
        <Container>
          <div className="flex-start gap-x-4 text-white">
            <HiHome size={25} color="#fff" />
            <p>/</p>
            <p>Books</p>
          </div>
        </Container>
      </div>
      <Container>
        <div className="grid grid-cols-1 gap-4 py-8 lg:grid-cols-4">
          {books.map((element, index) => (
            <Card
              key={index}
              className="flex flex-col items-start justify-start"
            >
              <Image width={200} height={200} src={element.image} alt="book" />
              <h2 className="h3-bold">{element.title}</h2>
              <p className="base-medium">{element.author}</p>
              <Button className="mt-2 rounded-full bg-primary-500 text-white">
                Add to favorites
              </Button>
              <Button className="mt-2 rounded-full border-4 border-primary-500 px-6  font-bold text-primary-500">
                Learn More
              </Button>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default page;
