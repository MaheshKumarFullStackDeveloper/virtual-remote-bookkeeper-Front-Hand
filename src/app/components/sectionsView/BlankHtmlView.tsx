"use client";
import React, { useEffect, useState } from "react";
type AddProps = {
  content: string;
};


import createDOMPurify from 'dompurify';


export default function BlankHtmlView({ content }: AddProps): React.JSX.Element {

  const [safeHTML, setSafeHTML] = useState('');
  useEffect(() => {
    if (content !== "") {

      const Details = JSON.parse(content);
      const DOMPurify = createDOMPurify(window);
      const clean = DOMPurify.sanitize(Details?.description || '');
      setSafeHTML(clean);
    }



  }, [content]); // Runs whenever selectedSection changes





  return (<>
    <div
      dangerouslySetInnerHTML={{ __html: safeHTML }}
    />
  </>)

}