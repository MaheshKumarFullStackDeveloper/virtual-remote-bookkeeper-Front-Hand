'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';

type AddProps = {
  content: string;
};

type TwoRowTwoColumn = {
  mainHeading: string;
  heading1: string;
  buttonText1: string;
  buttonUrl1: string;
  description1: string;
  heading2: string;
  buttonText2: string;
  buttonUrl2: string;
  description2: string;
  heading3: string;
  buttonText3: string;
  buttonUrl3: string;
  description3: string;
  heading4: string;
  buttonText4: string;
  buttonUrl4: string;
  description4: string;
};

export default function TwoRowTwoColumnView({ content }: AddProps): React.JSX.Element {
  const [contentData, setContentData] = useState<TwoRowTwoColumn | null>(null);

  useEffect(() => {
    if (!content) return;
    try {
      const parsed = JSON.parse(content) as TwoRowTwoColumn;
      setContentData(parsed);
    } catch (err) {
      console.error('Failed to parse TwoRowTwoColumn content:', err);
    }
  }, [content]);

  const items = contentData
    ? [1, 2, 3, 4].map((i) => ({
      heading: contentData[`heading${i}` as keyof TwoRowTwoColumn] as string,
      description: contentData[`description${i}` as keyof TwoRowTwoColumn] as string,
      buttonText: contentData[`buttonText${i}` as keyof TwoRowTwoColumn] as string,
      buttonUrl: contentData[`buttonUrl${i}` as keyof TwoRowTwoColumn] as string,
    }))
    : [];

  const buttonClass =
    'bg-[#DAA520] hover:bg-[#DAA520] transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 text-black mt-10 px-14 mb-6 text-[16px]';

  return (
    <section className="bg-black max-w-[1370px] w-full mx-auto px-4 md:px-16 py-10">
      <h2 className="text-[#DAA520]  mb-8">{contentData?.mainHeading}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {items.map(({ heading, description, buttonText, buttonUrl }, idx) => (
          <div key={idx} className="p-4 border border-white rounded">
            <h4 className="text-white text-left dm font-mono">{heading}</h4>
            <p className="text-white font-mono m">{description}</p>
            <Link href={buttonUrl || '#'}>
              <Button size="lg" variant="default" className={buttonClass}>
                {buttonText} <ArrowRightIcon className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}