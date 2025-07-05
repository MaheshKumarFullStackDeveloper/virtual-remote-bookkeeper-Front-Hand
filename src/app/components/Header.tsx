"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavigationMenuMain from "./NavigationMenuMain";
import { MobileNavigationMenuMain } from "./MobileNavigationMenuMain";
import { useAppSelector } from "../store/hooks/hooks";
import { selectHeaderButton, selectHeaderLogo } from "../store/slice/dataSlice";


function Header() {

  const HeaderLogo = useAppSelector(selectHeaderLogo);
  const HeaderButton = useAppSelector(selectHeaderButton);

  return (
    <>
      <header className="border-b bg-black sticky top-0 z-50 ">
        <div className="container  mx-auto max-w-[1400px] px-[12px]  flex items-center justify-between ">
          <Link
            href="/"
            className="flex  justify-center items-center mt-[5px] mb-[6px]"
          >
            <div> {HeaderLogo !== null ? (<Image quality={50} priority
              sizes="(max-width: 600px) 300px, (max-width: 1024px) 600px, 993px"

              src={HeaderLogo as string}
              width={153}
              height={122}
              alt="logo"
              className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500"
            ></Image>) : (<></>)}
            </div>
          </Link>
          <div className="flex flex-1 items-end justify-end  text-white  px-4">
            <div className="hidden min-[936px]:block">
              <NavigationMenuMain device="Desk" />
            </div>
            <div className="hidden max-[936px]:block">
              <MobileNavigationMenuMain />
            </div>
          </div>
          <div className="hidden min-[880px]:block text-right text-white w-auto  max-w-[200px] px-4 ">
            {HeaderButton !== null ? (<><div
              dangerouslySetInnerHTML={{ __html: HeaderButton }}
            /></>) : (<></>)}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
