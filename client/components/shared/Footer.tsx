import React from "react";
import Image from "next/image";


const Footer = () => {
    return (
        <>
            <span className="block h-[3px] bg-slate-200"></span>
            <div className="bg-white py-16 text-black">
                <div className="container gap-x-4 flex-row-between">
                    <div className="flex-row-start items-center gap-x-4">
                        <Image
                            src={"/assets/logo.svg"}
                            alt={"Logo"}
                            width={50}
                            height={50}
                        />
                        <h2 className="hidden md:inline-block font-bold">Fait avec amour en France</h2>
                    </div>
                    <h2>2024 @Trouve Moi Un livre all right reserved</h2>
                </div>
            </div>
        </>

    );
};

export default Footer;
