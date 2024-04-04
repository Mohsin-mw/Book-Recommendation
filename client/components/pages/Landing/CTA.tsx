import Image from "next/image";
import React from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const CTA = () => {
    return (
        <div className="container">
            <div className="flex-between py-24">
                <div>
                    <h2 className="h3-bold w-2/3 md:text-2xl  lg:w-2/3 lg:text-4xl">
                    Abonnez-vous à notre newsletter et aux dernières nouvelles !
                    </h2>
                    <p className="base-medium w-2/3 py-4 text-gray-600">
                    Un voyage de mille lieues commence toujours par un premier pas.
                    </p>
                    <div className="inline-block">
                        <div className="flex-start  rounded-full border-2  border-primary-500">
                            <Input
                                type="email"
                                placeholder="Enter your email address"
                                className="rounded-full border-none placeholder:text-white  focus:ring-transparent"
                            />
                            <Button className="rounded-full bg-primary-500 py-6 text-white">
                                S&apos;abonner
                            </Button>
                        </div>
                    </div>
                </div>
                <Image
                    className="hidden lg:flex"
                    src={"/assets/Home/cta-books.png"}
                    width={400}
                    height={400}
                    alt="cta books"
                />
            </div>
        </div>
    );
};

export default CTA;
