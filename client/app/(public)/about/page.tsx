import React from "react";
import { HiHome } from "react-icons/hi";
import Container from "@/components/shared/Container/Container";
import { GiConfirmed } from "react-icons/gi";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const page = () => {
  const insights = [
    {
      title: "Measure your performance",
      description:
        "Stay connected with your team and make quick decisions wherever you are. ",
    },
    {
      title: "Custom analytics",
      description:
        "Get a complete sales dashboard in the cloud. See activity, revenue and social metrics all in one place.",
    },
    {
      title: "Team Management",
      description:
        "Our calendar lets you know what is happening with customer and projects so you",
    },
    {
      title: "Build your website",
      description:
        "A tool that lets you build a dream website even if you know nothing about web design or programming.",
    },
    {
      title: "Connect multiple apps",
      description:
        "The first business platform to bring together all of your products from one place.",
    },
    {
      title: "Easy setup",
      description:
        "End to End Business Platform, Sales Management, Marketing Automation, Help Desk",
    },
  ];

  const secondaryInsights = [
    {
      title: "Measure your performance",
      description:
        "Stay connected with your team and make quick decisions wherever you are. ",
    },
    {
      title: "Custom analytics",
      description:
        "Get a complete sales dashboard in the cloud. See activity, revenue and social metrics all in one place.",
    },
    {
      title: "Team Management",
      description:
        "Our calendar lets you know what is happening with customer and projects so you",
    },
  ];

  return (
    <div>
      <div className="bg-primary-500 py-16">
        <Container>
          <div className="flex-start gap-x-4 text-white">
            <HiHome size={25} color="#fff" />
            <p>/</p>
            <p>About Us</p>
          </div>
        </Container>
      </div>
      <Container>
        <div className="flex w-full flex-col items-center justify-start py-8 text-center">
          <h1 className="h2-bold w-full text-center text-2xl">
            Gain more insight into how people use your
          </h1>
          <p className="base-medium w-2/3 py-1 text-center text-gray-500">
            With our integrated CRM, project management, collaboration and
            invoicing capabilities, you can manage every aspect of your business
            in one secure platform.
          </p>
          <div className="grid grid-cols-1 gap-4 py-12 lg:grid-cols-3">
            {insights.map((element, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-start"
              >
                <div className="my-2 rounded-md bg-primary-500 p-1 text-white">
                  <GiConfirmed size={25} />
                </div>
                <h3 className="h3-bold">{element.title}</h3>
                <p className="base-medium mt-2 text-gray-400">
                  {element.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-start py-8 text-center">
          <h1 className="h2-bold w-full text-center text-2xl">
            Gain more insight into how people use your
          </h1>
          <p className="base-medium w-2/3 py-1 text-center text-gray-500">
            With our integrated CRM, project management, collaboration and
            invoicing capabilities, you can manage every aspect of your business
            in one secure platform.
          </p>
          <div className="grid grid-cols-1 gap-4 py-12 lg:grid-cols-2">
            <div>
              {" "}
              {secondaryInsights.map((element, index) => (
                <div
                  key={index}
                  className="my-4 flex flex-col items-start justify-start"
                >
                  <div className="my-2 rounded-md bg-primary-500 p-1 text-white">
                    <GiConfirmed size={25} />
                  </div>
                  <h3 className="h3-bold">{element.title}</h3>
                  <p className="base-medium mt-2 text-start text-gray-400">
                    {element.description}
                  </p>
                </div>
              ))}
            </div>
            <Image
              src="/assets/temp/About.png"
              width={400}
              height={400}
              alt="About Picture"
            />
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-start py-8 text-center">
          <h1 className="h2-bold w-full text-center text-2xl">
            Gain more insight into how people use your
          </h1>
          <p className="base-medium w-2/3 py-1 text-center text-gray-500">
            With our integrated CRM, project management, collaboration and
            invoicing capabilities, you can manage every aspect of your business
            in one secure platform.
          </p>
          <div className="grid grid-cols-1 gap-4 py-12 lg:grid-cols-2">
            <Image
              src="/assets/temp/About.png"
              width={400}
              height={400}
              alt="About Picture"
            />
            <div className="py-4 text-start">
              <h2 className="py-1 text-start text-5xl font-bold">
                Gain more insight into how people use your
              </h2>
              <p className="base-bold py-1 text-start text-gray-400">
                With our integrated CRM, project management, collaboration and
                invoicing capabilities, you can manage every aspect of your
                business in one secure platform.
              </p>
              <Button className="my-2 bg-primary-500 text-white">
                Get Started
              </Button>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-start py-8 text-center">
          <h1 className="h2-bold w-full text-center text-2xl">
            Let’s stay connected
          </h1>
          <p className="base-medium w-2/3 py-1 text-center text-gray-500">
            It's never been easier to get in touch with Flex. Call us, use our
            live chat widget or email and we'll get back to you as soon as
            possible!
          </p>
          <div className="grid grid-cols-3 gap-x-12">
            <div className="flex flex-col items-center justify-start">
              <div className="my-2 rounded-md bg-primary-500 p-1 text-white">
                <GiConfirmed size={25} />
              </div>
              <h2>Email</h2>
              <p>contact@flex.co</p>
            </div>
            <div className="flex flex-col items-center justify-start">
              <div className="my-2 rounded-md bg-primary-500 p-1 text-white">
                <GiConfirmed size={25} />
              </div>
              <h2>Phone</h2>
              <p>+7-843-672-431</p>
            </div>
            <div className="flex flex-col items-center justify-start">
              <div className="my-2 rounded-md bg-primary-500 p-1 text-white">
                <GiConfirmed size={25} />
              </div>
              <h2>Socials</h2>
              <p>www.facebook.com</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default page;
