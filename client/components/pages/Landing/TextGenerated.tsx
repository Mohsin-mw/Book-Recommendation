"use client";
const words = `"Les livres sont comme des portails magiques, ouvrant des mondes de merveille et de sagesse, où l'âme trouve réconfort et l'esprit découvre ses ailes"`;

export function HeroText() {
    return (
        <div className="bg-primary py-6">
            <div className="container">
                <TextGenerateEffect words={words}/>
            </div>
        </div>);
}

import {TextGenerateEffect} from "@/components/ui/text-generate-effect";
