"use client";
import React, { useEffect, useState } from "react";
type AddProps = {
  content: string;
};

type BlankHtml = {
  description: string;
};

import createDOMPurify from 'dompurify';


export default function BlankHtmlView({ content }: AddProps): React.JSX.Element {

  const [contentData, setcontentData] = useState<BlankHtml | null>(null);

  useEffect(() => {
    if (content !== "") {
      const Details = JSON.parse(content);

      setcontentData(Details)
    }



  }, [content]); // Runs whenever selectedSection changes

  const [safeHTML, setSafeHTML] = useState('');

  useEffect(() => {
    const DOMPurify = createDOMPurify(window);
    const clean = DOMPurify.sanitize(contentData?.description || '');
    setSafeHTML(clean);
  }, [contentData]);


  return (<>
    <div
      dangerouslySetInnerHTML={{ __html: safeHTML }}
    />
  </>)

}