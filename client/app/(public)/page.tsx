import Blogs from "@/components/Sections/Home/Blogs";
import BookCategories from "@/components/Sections/Home/BookCategories";
import CTA from "@/components/Sections/Home/CTA";
import Hero from "@/components/Sections/Home/Hero";
import HeroCTA from "@/components/Sections/Home/HeroCTA";
import SignUpCTA from "@/components/Sections/Home/SignUpCTA";
import Testimonials from "@/components/Sections/Home/Testimonials";
import React from "react";

const page = () => {
  return (
    <div>
      <Hero />
      <HeroCTA />
      <BookCategories />
      <CTA />
      <Testimonials />
      <SignUpCTA />
      <Blogs />
    </div>
  );
};

export default page;
