import React from "react";
import Navbar from "@/components/shared/Navbar";
import Scroller from "@/components/shared/Scroller";
import Footer from "@/components/shared/Footer";
// import Footer from "@/components/shared/Layout/Footer/Footer";


const PublicLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar/>
            <Scroller/>
            {children}
            <Footer/>
        </>
    )
}

export default PublicLayout;
