import React from "react";
import Navbar from "@/components/shared/Navbar";
import {NavbarFloating} from "@/components/shared/NavbarFloat";
// import Footer from "@/components/shared/Layout/Footer/Footer";


const PublicLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar/>
            <NavbarFloating/>
            {children}
        </>
    )
}

export default PublicLayout;
