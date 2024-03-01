import React from "react";
import Container from "../../Container/Container";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ToggleTheme } from "./ToggleTheme";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

const Navbar = () => {
  return (
    <>
      <Container>
        <div className="flex-column-start py-4">
          <div className="flex-between w-full">
            <Image
              src={"/assets/shared/logo.png"}
              alt={"Logo"}
              width={30}
              height={30}
              className="w-auto"
            />
            <div className="flex-center gap-x-4">
              <p className="body-medium">About</p>
              <ToggleTheme />
              <Button className="rounded-full bg-primary-500 font-bold text-white">
                Sign In
              </Button>
            </div>
          </div>
          <div className="md:flex-between hidden w-full py-2">
            <div className="flex-between gap-x-4 py-4">
              <Link href="/" className="body-medium">
                Romance
              </Link>
              <Link href="/" className="body-medium">
                Fiction
              </Link>
              <Link href="/" className="body-medium">
                History
              </Link>
              <Link href="/" className="body-medium">
                Self Help
              </Link>
            </div>
            <div className="flex-between gap-x-2">
              <div className="flex-between gap-x-1 bg-slate-50 rounded-full border-2 border-gray-200  px-4">
                <div className="text-primary-500">
                  <FaSearch />
                </div>
                <Input
                  type="email"
                  placeholder="Search ..."
                  className="rounded-full border-none  focus:ring-transparent"
                />
              </div>
              <div className="text-gray-500">
                <CiHeart size={35} />
              </div>
            </div>
          </div>
        </div>
      </Container>
      <div className="block h-[3px] w-full bg-slate-100"></div>
    </>
  );
};

export default Navbar;
