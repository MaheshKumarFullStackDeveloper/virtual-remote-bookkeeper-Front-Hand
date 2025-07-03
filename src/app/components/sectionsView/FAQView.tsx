"use client";

import React, { useEffect, useState } from "react";
type AddProps = {
  content: string;
};

type CONTENT = {
  heading: string;
  categorySlug: string;
};

type FAQ = {
  title: string;
  content: string;
};
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


const baseUrl = process.env.NEXT_PUBLIC_API; // Load from .env
interface PaginatedResponse {
  data: FAQ[];
}
const homeUrl = process.env.NEXT_PUBLIC_BASE_PATH; // Load from .env
//blog?page=${page}&limit=${limit}
const fetchFaqs = async (
  limit?: number // Optional parameter for category
): Promise<PaginatedResponse> => {

  const res = await fetch(`${baseUrl}/faq?page=1&limit=${limit}`, {
    headers: {
      origin: homeUrl ?? ""
    }
  });
  const response = await res.json();

  return { data: response.data.faqsList };
};
export default function FAQView({ content }: AddProps): React.JSX.Element {

  const [contentData, setcontentData] = useState<CONTENT | null>(null);
  const [faqs, setFaqsData] = useState<FAQ[] | null>(null);

  useEffect(() => {
    if (content !== "") {
      const Details = JSON.parse(content);

      setcontentData(Details)
    }




  }, [content]); // Runs whenever selectedSection changes
  useEffect(() => {
    const loadFaqs = async () => {
      setFaqsData(null);
      const response = await fetchFaqs(3); // response is PaginatedResponse

      setFaqsData(response.data); // ✅ now you're setting FAQ[]
    };

    loadFaqs();
  }, []);

  return (<>
    <div className="my-5 md:my-8 lg:my-11 max-w-[1370px] w-full m-auto p-5">
      <h2>{contentData?.heading}</h2>

      <Accordion type="single" collapsible className="w-full">

        {faqs && faqs !== null && faqs.map((slide: FAQ, index: number) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="p-4 text-[20px] hover:no-underline cursor-pointer leading-[28px] font-bold font-georgia font-stretch-condensed capitalize bg-[#eee]">{slide?.title}</AccordionTrigger>
            <AccordionContent className="border border-solid border-[#cacaca] AccordionContents text-[#dd9933] p-4 text-[16px] font-normal font-mono leading-[25px] "><div
              className="text-left p-8 pt-0 "
              dangerouslySetInnerHTML={{ __html: slide?.content }}
            /></AccordionContent>
          </AccordionItem>
        ))}


      </Accordion>
    </div>
  </>)

}