"use client";

import React, { useEffect, useState } from "react";
import ContactForm from "../ContactForm";
type AddProps = {
  content: string;
};

type TopTextBottomContactForm = {
  heading: string;
  description: string;
};


export default function TopTextBottomContactFormView({ content }: AddProps): React.JSX.Element {

  const [contentData, setcontentData] = useState<TopTextBottomContactForm | null>(null);

  useEffect(() => {
    if (content !== "") {
      const Details = JSON.parse(content);

      setcontentData(Details)
    }



  }, [content]); // Runs whenever selectedSection changes


  return (<>


    <div className="my-5 md:my-8 lg:my-11 max-w-[1100px]  text-center  w-full m-auto p-5">
      <h2>{contentData?.heading}</h2>
      <p className=" my-12 text-center text-[#596475]" dangerouslySetInnerHTML={{ __html: contentData?.description || "" }} />



      <ContactForm />

    </div>
  </>)

}