import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth, UserButton } from "@clerk/nextjs";

const Navbar = async () => {
  const { userId } = auth();
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
            <div className="flex-row-between gap-x-4 py-4 text-gray-900">
              <Link href={"/genre/Romance"} className="body-medium">
                Romance
              </Link>
              <Link href={"/genre/History"} className="body-medium">
                Histoire
              </Link>
              <Link href={"/genre/Memoir"} className="body-medium">
                Mémoire
              </Link>
              <Link href={"/genre/Self Help"} className="body-medium">
                Developpement personnel
              </Link>
            </div>
          </div>
        </span>
        <span className="flex-row-center gap-x-8">
          {/*<Link href={"/about"} className="hidden md:inline body-medium">About</Link>*/}
          {userId ? (
            <>
              <Link href={"/favorite"} className="body-medium">
                Favoris
              </Link>
              <UserButton />
            </>
          ) : (
            <Link href={"/sign-in"}>
              <Button>Se connecter</Button>
            </Link>
          )}
        </span>
      </div>
      <span className="block h-[3px] bg-slate-200"></span>
    </div>
  );
};

export default Navbar;
