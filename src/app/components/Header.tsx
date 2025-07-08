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
    <header className="sticky top-0 z-50 border-b bg-black">
      <div className="container mx-auto max-w-[1400px] px-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center my-1.5">
          {HeaderLogo && (
            <Image
              src={HeaderLogo}
              alt="logo"
              width={153}
              height={122}
              priority
              quality={50}
              sizes="(max-width: 600px) 300px, (max-width: 1024px) 600px, 993px"
              className="transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500"
            />
          )}
        </Link>

        {/* Navigation Menus */}
        <div className="flex flex-1 justify-end items-end text-white px-4">
          <div className="hidden min-[936px]:block">
            <NavigationMenuMain device="Desk" />
          </div>
          <div className="hidden max-[936px]:block">
            <MobileNavigationMenuMain />
          </div>
        </div>

        {/* Header Button */}
        {HeaderButton && (
          <div className="hidden min-[880px]:block text-white text-right w-auto max-w-[200px] px-4">
            <div dangerouslySetInnerHTML={{ __html: HeaderButton }} />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;