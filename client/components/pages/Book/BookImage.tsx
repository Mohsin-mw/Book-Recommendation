"use client"

import Image from "next/image";
import React from "react";

interface BookImageProps {
    image: string;
}

const preventRightClick = (event: any) => {
    event.preventDefault();
};

const BookImage: React.FC<BookImageProps> = ({ image }) => {
    return (
        <Image
            src={image}
            width={500}
            height={500}
            alt="Book"
            className="rounded-md object-cover"
            onContextMenu={preventRightClick}
        />
    );
}

export default BookImage;