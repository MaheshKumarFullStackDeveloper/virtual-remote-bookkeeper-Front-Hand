"use client";

import React, { useEffect, useState } from "react";
import QuickContact from "../QuickContact";
type AddProps = {
  content: string;
};

type LeftSideTextRightSideContactFormView = {
  heading: string;
  description: string;
};
export default function LeftSideTextRightSideContactFormViewView({ content }: AddProps): React.JSX.Element {

  const [contentData, setcontentData] = useState<LeftSideTextRightSideContactFormView | null>(null);

  useEffect(() => {
    if (content !== "") {
      const Details = JSON.parse(content);

      setcontentData(Details)
    }



  }, [content]); // Runs whenever selectedSection changes


  return (<>



    <div className="flex flex-col md:flex-row   bg-[#003a3a]  max-w-[1370px] text-center justify-between w-full m-auto p-6 ">
      <div className="flex-1 p-2 mt-6">

        <h2 className="text-left mb-5" dangerouslySetInnerHTML={{ __html: contentData?.heading ?? "" }}
        />
        <div className="text-left text-white pagesec1"
          dangerouslySetInnerHTML={{ __html: contentData?.description ?? "" }}
        />
      </div>
      <div className="flex-1 my-5 mt-0  w-full m-auto p-6 pt-[60px]">

        <div className=" bg-black text-white border-white border-solid border-7 px-7 py-8 p-2 text-left ">
          <QuickContact />

        </div>


      </div>
    </div>



  </>)

}