import React from "react";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
    return (
        <div className="bg-slate-50">
            <div className="h-24 container py-8 flex-row-between">
                <span className="flex-row-start gap-x-8">
                    <Link href={"/"}>
                        <Image
                            src={"/assets/logo.svg"}
                            alt={"Logo"}
                            width={50}
                            height={50}
                        />
                    </Link>
                    <div className=" hidden md:flex-row-start w-full py-2">
                        <div className="flex-row-between gap-x-4 py-4">
                            <Link href={"/genres/Romance"} className="body-medium">
                                Romance
                            </Link>
                            <Link href={"/genres/History"} className="body-medium">
                                History
                            </Link>
                            <Link href={"/genres/Memoir"} className="body-medium">
                                Memoirs
                            </Link>
                            <Link href={"/genres/Self Help"} className="body-medium">
                                Self Help
                            </Link>
                        </div>
                    </div>
                </span>
                <span className="flex-row-center gap-x-8">
                    <Link href={"/about"} className="hidden md:inline body-medium">About</Link>
                    <Button>Sign In</Button>
                </span>
            </div>
            <span className="block h-[3px] bg-slate-200"></span>
        </div>
    );
};

export default Navbar;
