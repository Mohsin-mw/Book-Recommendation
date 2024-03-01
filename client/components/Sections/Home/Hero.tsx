import Container from "@/components/shared/Container/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { BiSearch } from "react-icons/bi";

const Hero = () => {
  return (
    <div className="bg-hero bg-cover bg-no-repeat py-12 lg:py-36">
      <Container>
        <h1 className="h1-bold w-2/3 md:text-2xl  lg:w-2/3 lg:text-7xl">
          Find the book you’re looking for easier to read.
        </h1>
        <p className="base-medium py-4 text-gray-600">
          The most appropriate book site to reach books
        </p>
        <div className="my-8 inline-block rounded-md border-primary-500  bg-white py-6 pl-4 pr-14 drop-shadow-2xl">
          <div className=" lg:flex-start gap-y-4">
            <Input
              type="email"
              placeholder="Find your favorite book here..."
              className="w-96 border-2   rounded-full bg-gray-50 py-6 font-bold text-gray-900  placeholder:text-gray-400 focus:ring-transparent"
            />
            <Button className="my-2 rounded-full px-8 py-6 text-white  bg-[#E8BA96] lg:ml-4">
              Search
              <BiSearch size={20} className="ml-2" />
            </Button>
            <Button className="rounded-full border-2 border-primary-500 text-primary-500  px-8 py-6   lg:ml-4">
              Category
              <IoIosArrowDown size={20} className="ml-2" />
            </Button>
          </div>
        </div>
        <div className="my-8 lg:w-1/3">
          <p className="body-medium">
            “Viverra viverra nibh enim et aliquam, enim. Tempor, sit mus viverra
            orci dui consequat turpis scelerisque faucibus.”
          </p>
          <div className="flex-start my-4">
            <Image
              width={50}
              height={50}
              className="object-cover"
              src="/assets/auth/ceo.png"
              alt="user picture"
            />
            <div className="flex-column-start ml-2">
              <h4 className="body-medium">Rwanda Melflor</h4>
              <p className="small-medium">zerowaste.com</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
