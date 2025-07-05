"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
type AddProps = {
  content: string;
};

import localFont from "next/font/local";
const georgia = localFont({
  src: [
    {
      path: "../../../../public/font/Georgia.woff2",
      weight: "normal",
      style: "normal",
    },
    {
      path: "../../../../public/font/Georgia.woff",
      weight: "normal",
      style: "normal",
    },
  ],
  display: "swap",
});

type PageBanner = {
  topHeading: string;
  mainHeading1: string;
  mainHeading2: string;
  mainHeading3: string;
  bottomHeading: string;
  buttonText: string;
  buttonUrl: string;
  leftImage: string;
  leftImageText: string;
  rightImage: string;
  order: string;
};



export default function PageBannerView({ content }: AddProps): React.JSX.Element {

  const [contentData, setcontentData] = useState<PageBanner | null>(null);

  useEffect(() => {
    if (content !== "") {
      const Details = JSON.parse(content);

      setcontentData(Details)
    }



  }, [content]); // Runs whenever selectedSection changes

  const isImageFormat = (imageUrl: string | undefined): boolean => {
    return !!imageUrl && /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(imageUrl);
  };

  return (<>
    <div className="bg-[rgb(42,108,101)] w-[100%] p-4 m-auto h-[850px] ">
      <div className="flex flex-col sm:flex-row max-w-[1370px] w-full m-auto  ">
        <div className="flex-[1.2] float-left lg:ml-16 md:ml-5 sm:ml-1">
          <p className="bannerP1">
            {contentData?.topHeading}
          </p>

          <span
            className={`${georgia.className} bannerHaddingOne `}
          >{contentData?.mainHeading1} </span>
          <span
            className={`${georgia.className} bannerHaddingTwo `}
          >{contentData?.mainHeading2}
          </span>
          <br />
          <span
            className={`${georgia.className} bannerHaddingThree `}
          >{contentData?.mainHeading3} </span>
          <p className="bannerP2">
            {contentData?.bottomHeading}
          </p>
          <p className="mt-[30px]">
            <Link href={contentData?.buttonUrl || "#"} >
              <Button
                size="default"
                variant="default"
                className=" text-white font-Roboto font-[500] text-[20px] bg-[#daa521] rounded-[1px] pt-[9px] mt-[-8px] tb-[17px] px-[60px] h-[51px] transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-black hover:text-white  no-underline "
              >{contentData?.buttonText} </Button>
            </Link>
          </p>
          <div className="flex flex-col md:flex-row w-full m-auto  ">
            <div className="flex-1 mt-[30px] ">
              {isImageFormat(contentData?.rightImage) ? (
                <Image
                  priority
                  sizes="(max-width: 600px) 300px, (max-width: 1024px) 600px, 993px"

                  src={contentData?.leftImage || "/logo.png"}
                  width={300}
                  height={80}
                  alt="home-banner"
                  className="bannerimage"
                ></Image>) : (<></>)}

            </div>
            <div className="flex-1 ">

              <p className="bannerP3">
                {contentData?.leftImageText}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 hidden md:block">


          {isImageFormat(contentData?.rightImage) ? (
            <Image
              priority
              sizes="(max-width: 600px) 300px, (max-width: 1024px) 600px, 993px"

              src={contentData?.rightImage || "/logo.png"}
              width={523}
              height={750}
              alt="home-banner"
              className="bannerimage"
            ></Image>) : (<></>)}
        </div>
      </div>
    </div>
  </>)

}