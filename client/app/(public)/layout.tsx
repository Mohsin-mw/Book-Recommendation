import React from "react";
import Navbar from "@/components/shared/Navbar";
import {NavbarFloating} from "@/components/shared/NavbarFloat";
import Scroller from "@/components/shared/Scroller";
// import Footer from "@/components/shared/Layout/Footer/Footer";


const PublicLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar/>
            <NavbarFloating/>
            <Scroller/>
            {children}
        </>
    )
}

export default PublicLayout;
