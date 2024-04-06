"use client";

import {cn} from "@/lib/utils";
import React, {useEffect, useState} from "react";
import {bookInterface} from "@/types/types";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image"

export const InfiniteMovingBooks = ({
                                        books,
                                        direction = "left",
                                        speed = "fast",
                                        pauseOnHover = true,
                                        className,
                                    }: {
    books: bookInterface[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);

    useEffect(() => {
        addAnimation();
    }, []);
    const [start, setStart] = useState(false);

    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            getDirection();
            getSpeed();
            setStart(true);
        }
    }

    const getDirection = () => {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "forwards"
                );
            } else {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "reverse"
                );
            }
        }
    };
    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty("--animation-duration", "20s");
            } else if (speed === "normal") {
                containerRef.current.style.setProperty("--animation-duration", "40s");
            } else {
                containerRef.current.style.setProperty("--animation-duration", "80s");
            }
        }
    };
    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_10%,white_95%,transparent)]",
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
                    start && "animate-scroll ",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
            >
                {books.map((book, idx) => (
                    <li
                        className="w-[350px] grid grid-cols-1 grid-rows-1 bg-white shadow-lg max-w-full relative rounded-2xl  flex-shrink-0 border-2 border-slate-300 px-8 py-6 md:w-[450px]"

                        key={book.id}
                    >
                        <div className={"flex-row-start gap-x-4"}>
                            <Image className={"rounded-md shadow-md"} src={book.image} width={70} height={70}
                                   alt={book.title}/>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg line-clamp-2">{book.title}</h3>
                                <p className="text-gray-500">{book.author}</p>
                            </div>
                        </div>
                        <blockquote className="pt-2">
                            <div
                                aria-hidden="true"
                                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                            ></div>
                            <span
                                className="line-clamp-3 relative z-20 text-sm leading-[1.6] text-gray-800 font-normal">
                {book.description}
              </span>
                            <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">


                </span>
                            </div>
                        </blockquote>
                        <div>
                            <Link href={`/book/${encodeURIComponent(book.title)}`}>
                                <Button>En savoir plus</Button>
                            </Link>

                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
