"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import QuickContact from "../QuickContact";
type AddProps = {
  content: string;
};

type BlankHtml = {
  image: string;
};


export default function LeftSideImageRightSideContactFormView({ content }: AddProps): React.JSX.Element {

  const [contentData, setcontentData] = useState<BlankHtml | null>(null);

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


    <div className="flex flex-col md:flex-row my-5  max-w-[100%] w-full m-auto p-5">
      <div className="flex-1 p-4">
        {isImageFormat(contentData?.image) ? (
          <Image quality={50} priority
            sizes="(max-width: 600px) 300px, (max-width: 1024px) 600px, 993px"

            src={contentData?.image || "/logo.png"}
            width={625}
            height={352}
            alt="home-banner"
            className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:backdrop-blur-md"
          ></Image>
        ) : (<></>)}

      </div>
      <div className="flex-1 bg-black text-white px-7 py-8 p-2 text-left border-[0.5px] ">
        <QuickContact />
      </div>
    </div>
  </>)

}