import React from "react";
import Navbar from "@/components/shared/Layout/Navbar/Navbar";
import Footer from "@/components/shared/Layout/Footer/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
