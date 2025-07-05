

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"

import Link from "next/link"
import Image from "next/image"
import NavigationMenuMain from "./NavigationMenuMain"
import { useAppSelector } from "../store/hooks/hooks"
import { selectHeaderButton, selectHeaderLogo } from "../store/slice/dataSlice"

export function MobileNavigationMenuMain() {
  const HeaderLogo = useAppSelector(selectHeaderLogo);
  const HeaderButton = useAppSelector(selectHeaderButton);
  return (
    <Sheet  >
      <SheetTrigger asChild>
        <span className="mightytek-menu-box"> <span className="moblie-menu"><span className="hamburger"></span></span></span>
      </SheetTrigger>
      <SheetContent className="bg-black">
        <SheetHeader >
          <Link href="/" className=" mt-[5px] ml-[20px] mb-[6px]">
            <div > {HeaderLogo !== null ? (<Image quality={50} priority
              sizes="(max-width: 600px) 300px, (max-width: 1024px) 600px, 993px"

              src={HeaderLogo as string} width={80} height={80} alt="logo" className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500"
            ></Image>) : (<></>)}
            </div>

          </Link>
        </SheetHeader>
        <div className="sideMob">
          <NavigationMenuMain device='Mob' />
        </div>
        <SheetFooter>
          {HeaderButton !== null ? (<> <div
            dangerouslySetInnerHTML={{ __html: HeaderButton }}
          /></>) : (<></>)}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
