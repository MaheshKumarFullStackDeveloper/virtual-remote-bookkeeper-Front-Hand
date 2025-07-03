"use client";
import React, { useEffect, useState } from "react";
type AddProps = {
  content: string;
};

type BlankHtml = {
  description: string;
};


export default function BlankHtmlView({ content }: AddProps): React.JSX.Element {

  const [contentData, setcontentData] = useState<BlankHtml | null>(null);

  useEffect(() => {
    if (content !== "") {
      const Details = JSON.parse(content);

      setcontentData(Details)
    }



  }, [content]); // Runs whenever selectedSection changes


  return (<>
    <div
      dangerouslySetInnerHTML={{ __html: contentData?.description || "" }}
    />
  </>)

}