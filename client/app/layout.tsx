import React from "react";
import type {Metadata} from "next";
import {Outfit} from "next/font/google";
import "./globals.css";
import TanstackProvider from "@/providers/TanstackProvider";
import {ClerkProvider} from "@clerk/nextjs";
import {Toaster} from "@/components/ui/sonner";

const outfit = Outfit({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Trouve Moi Un livre",
    description:
        "Trouve moi un livre est un site web qui prend en compte un livre que vous avez aimé et vous recommandera d'autres livres que vous pourriez apprécier ! Une fois qu'un livre a retenu votre attention, vous pouvez ensuite cliquer dessus et interagir avec d'autres à son sujet ! \n" +
        "Mais soyez patient avec nous, ce n'est que le début de notre merveilleux voyage, donc avec le temps ce site web s'améliorera de plus en plus. Nous mettrons en œuvre de nombreuses autres fonctionnalités et fournirons des recommandations plus significatives pour vous ! Nous sommes impatients de voir ce qui va arriver.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="fr" className="antialiased">
            <body className={`${outfit.className} bg-secondary text-black`}>
            <TanstackProvider>{children}</TanstackProvider>
            <Toaster/>
            </body>
            </html>
        </ClerkProvider>
    );
}
