import Container from "@/components/shared/Container/Container";
import React from "react";
import { HiHome } from "react-icons/hi";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const page = () => {
  return (
    <div>
      <div className="bg-primary-500 py-16">
        <Container>
          <div className="flex-start gap-x-4 text-white">
            <HiHome size={25} color="#fff" />
            <p>/</p>
            <p>Oath and Honor</p>
          </div>
        </Container>
      </div>
      <Container>
        <div className="flex h-full flex-col items-start justify-between gap-x-4 p-4 lg:flex-row">
          <Image
            src="/assets/temp/Book.png"
            width={500}
            height={500}
            alt="Book"
            className="rounded-md"
          />
          <div className="flex-column-start h-full py-14">
            <h2 className="h1-bold w-2/3 text-5xl">
              Oath and Honor: A Memoir and a Warning
            </h2>
            <div className="flex-start pt-8">
              <Image
                src="/assets/auth/ceo.png"
                width={70}
                height={70}
                alt="Author Picture"
              />
              <h4 className="h3-bold ml-2 font-bold text-gray-600">
                Steve Jobs
              </h4>
            </div>
            <p className="paragraph-regular pt-8 text-gray-600">
              Malesuada ut aliquam at ac est nisi, interdum etiam dignissim.
              Risus elit et fringilla habitant ut facilisi.Malesuada ut aliquam
              at ac est nisi, interdum etiam dignissim. Risus elit et fringilla
              habitant ut facilisi.
            </p>
            <div className="py-16">
              <div className="flex-between my-2 gap-x-16">
                <p className="paragraph-regular font-bold text-gray-500">
                  PUBLISHER
                </p>
                <p className="text-gray-600">Thomas Nelson</p>
              </div>
              <div className="flex-between my-2 gap-x-16">
                <p className="paragraph-regular font-bold text-gray-500">
                  ISBN
                </p>
                <p className="text-gray-600">09488281 18283</p>
              </div>
              <div className="flex-between my-2 gap-x-16">
                <p className="paragraph-regular font-bold text-gray-500">
                  LANGUAGE
                </p>
                <p className="text-gray-600">English</p>
              </div>
              <div className="flex-between my-2 gap-x-16">
                <p className="paragraph-regular font-bold text-gray-500">
                  PAGES
                </p>
                <p className="text-gray-600">240p</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="h3-bold inline-block border-b-4 border-primary-500 py-2">
            Write Review
          </h4>
          <div className="flex-start my-4 gap-x-2">
            <Image
              src={"/assets/auth/ceo.png"}
              width={50}
              height={50}
              alt="user"
            />
            <div className="flex-column-start ml-2 w-full">
              <Textarea
                placeholder="Search ..."
                className="rounded-md bg-gray-300   focus:ring-transparent"
              />
              <Button className="rounded-full bg-primary-500 text-white">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default page;
