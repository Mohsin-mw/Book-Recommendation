"use client";
const words = `"Books are like magical portals, opening worlds of wonder and wisdom, where the soul finds solace and the mind discovers its wings"`;

export function HeroText() {
    return (
        <div className="bg-primary py-6">
            <div className="container">
                <TextGenerateEffect words={words}/>
            </div>
        </div>);
}

import {TextGenerateEffect} from "@/components/ui/text-generate-effect";
