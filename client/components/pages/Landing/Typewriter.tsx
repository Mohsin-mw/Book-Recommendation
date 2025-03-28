"use client";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import React from "react";
import TypeWriterButtons from "@/components/pages/Landing/TypeWriterButtons";

export function Typewriter() {
  const words = [
    {
      text: "Découvrez",
    },
    {
      text: "des",
    },
    {
      text: "livres",
    },
    {
      text: "avec",
    },
    {
      text: "nous.",
      className: "text-primary",
    },
  ];
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-[25rem] bg-white ">
        <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
          Le Chemin vers la liberté commence ici
        </p>
        <TypewriterEffectSmooth words={words} />
        <TypeWriterButtons />
      </div>
      <span className="block h-[3px] bg-slate-200"></span>
    </div>
  );
}
