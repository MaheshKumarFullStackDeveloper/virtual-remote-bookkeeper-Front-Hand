'use client';

import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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

interface PaginatedResponse {
  data: FAQ[];
}

const baseUrl = process.env.NEXT_PUBLIC_API ?? '';
const homeUrl = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

// ✅ Optimized fetch with revalidation intent
const fetchFaqs = async (
  limit = 20,
  categorySlug: string = ''
): Promise<PaginatedResponse> => {
  const res = await fetch(
    `${baseUrl}/faq/bycatslug?page=1&limit=${limit}&slug=${categorySlug}`,
    {
      headers: {
        origin: homeUrl,
        'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=60',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=3600',
      },
      // Note: `cache: 'force-cache'` has no effect here since this is client-side
      next: { revalidate: 60 }, // Safe for server if moved later
    }
  );
  //console.log("Faqs cat", `${baseUrl}/faq/bycatslug?page=1&limit=${limit}&slug=${categorySlug}`)

  const response = await res.json();
  // console.log("Faqs response", response)
  return { data: response?.data?.faqsList ?? [] };
};

export const runtime = 'edge';

export default function FAQView({ content }: AddProps): React.JSX.Element {
  const [contentData, setContentData] = useState<CONTENT | null>(null);
  const [faqs, setFaqsData] = useState<FAQ[] | null>(null);

  useEffect(() => {
    if (!content) return;
    try {
      const parsed = JSON.parse(content) as CONTENT;
      setContentData(parsed);
    } catch (err) {
      console.error('Invalid FAQ content JSON:', err);
    }
  }, [content]);

  useEffect(() => {
    if (!contentData?.categorySlug) return;

    const loadFaqs = async () => {
      const response = await fetchFaqs(20, contentData.categorySlug);
      setFaqsData(response.data);
    };

    loadFaqs();
  }, [contentData]);

  return (
    <div className="my-5 md:my-8 lg:my-11 max-w-[1100px] w-full mx-auto p-5">
      <h2 className=" text-center">{contentData?.heading}</h2>

      {faqs && (
        <Accordion type="single" collapsible className="w-full mt-6">
          {faqs.map((item, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger className="p-4 text-[20px] cursor-pointer leading-[28px] font-bold font-georgia capitalize bg-[#eee]">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="border border-[#cacaca] text-[#dd9933] text-[16px] font-mono leading-[25px] p-4">
                <div
                  className="text-left p-4 pt-0 pagesec1"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}