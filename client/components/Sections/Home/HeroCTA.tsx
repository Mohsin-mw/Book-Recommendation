import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const HeroCTA = () => {
  return (
    <div className="-translate-y-24 lg:flex-between ml-[300px]  hidden rounded-l-full bg-primary-500 py-8 pl-10 pr-44 ">
      <p className="h3-bold text-white">
        <span className="text-black">Subscribe newsletter and </span> <br /> get
        latest news from us
      </p>
      <p className="base-medium w-1/3 text-white">
        The intellectual content in a physical book need not be a composition,
        nor even be called a book.
      </p>
      <div className="flex-start rounded-full border-2 border-white  ">
        <Input
          type="email"
          placeholder="Enter your email address"
          className="rounded-full border-none placeholder:text-white  focus:ring-transparent"
        />
        <Button className="rounded-full bg-white py-6">Subscribe</Button>
      </div>
    </div>
  );
};

export default HeroCTA;
