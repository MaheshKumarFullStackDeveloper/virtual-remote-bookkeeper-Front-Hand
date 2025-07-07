'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';

type AddProps = {
  content: string;
};

type OneRowTwoColumn = {
  mainHeading: string;
  heading1: string;
  buttonText1: string;
  buttonUrl1: string;
  description1: string;
  heading2: string;
  buttonText2: string;
  buttonUrl2: string;
  description2: string;
  mainButtonText: string;
  mainButtonUrl: string;
};

const OneRowTwoColumnView = ({ content }: AddProps): React.JSX.Element => {
  const [contentData, setContentData] = useState<OneRowTwoColumn | null>(null);

  useEffect(() => {
    if (!content) return;
    try {
      const parsed = JSON.parse(content) as OneRowTwoColumn;
      setContentData(parsed);
    } catch (err) {
      console.error('Failed to parse section content:', err);
    }
  }, [content]);

  const commonButton =
    'bg-white hover:bg-[#DAA520] cursor-alias transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 text-black px-14 mb-6 text-[16px] hover:border hover:border-solid hover:border-white';

  return (
    <section className="bg-[#003a3a] max-w-[1370px] mx-auto w-full text-center p-5 px-1 md:px-16 pb-14 my-6">
      <h2 className="text-white mt-5 ">{contentData?.mainHeading}</h2>

      <div className="flex flex-col md:flex-row gap-6 my-12">
        {[1, 2].map((col, index) => {
          const heading = contentData?.[`heading${col}` as keyof OneRowTwoColumn] as string;
          const description = contentData?.[`description${col}` as keyof OneRowTwoColumn] as string;
          const buttonText = contentData?.[`buttonText${col}` as keyof OneRowTwoColumn] as string;
          const buttonUrl = contentData?.[`buttonUrl${col}` as keyof OneRowTwoColumn] as string;

          return (
            <div
              key={index}
              className="flex-1 border border-white p-6 bg-[#004949] rounded text-left text-white"
            >
              <h4 className="text-white text-left font-dm">
                {heading}
              </h4>
              <div
                className="mb-6 font-mono"
                dangerouslySetInnerHTML={{ __html: description ?? '' }}
              />
              <Link href={buttonUrl || '#'}>
                <Button size="lg" variant="default" className={commonButton}>
                  {buttonText} <ArrowRightIcon className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          );
        })}
      </div>

      <Link href={contentData?.mainButtonUrl || '#'}>
        <Button
          size="lg"
          variant="default"
          className="bg-[#DAA520] hover:bg-black hover:text-white transition-transform duration-300 text-black px-20 py-2 text-[16px] inline-flex items-center gap-2"
        >
          {contentData?.mainButtonText} <ArrowRightIcon className="h-5 w-5" />
        </Button>
      </Link>
    </section>
  );
};

export default OneRowTwoColumnView;