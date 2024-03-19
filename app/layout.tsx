import React from "react";
import type {Metadata} from "next";
import {Outfit} from "next/font/google";
import "./globals.css";
import TanstackProvider from "@/providers/TanstackProvider";
import {ClerkProvider} from '@clerk/nextjs'
import {Toaster} from "@/components/ui/sonner"

const outfit = Outfit({subsets: ["latin"]})

export const metadata: Metadata = {
    title: "Trouve Moi Un livre",
    description: "Trouve moi un livre is a website that takes account of a book that you have liked and will recommend you with others books that you might enjoy! Once a book picked your interests, you can then click on it and interact with others about it! \n" +
        "But so you know, bear with us, it's only the beginning stage of our marvellous journey so as time go this website will get better and better. We'll implement many more functionnalities and provide more meaningfull recommendation to you! Can't wait for what is to come.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
            <body className={`${outfit.className} bg-secondary`}>
            <TanstackProvider>
                {children}
            </TanstackProvider>
            <Toaster/>
            </body>
            </html>
        </ClerkProvider>
    );
}
