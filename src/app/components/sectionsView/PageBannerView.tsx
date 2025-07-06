'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import localFont from 'next/font/local';
import { Button } from '@/components/ui/button';

type AddProps = {
  content: string;
};

type PageBanner = {
  topHeading: string;
  mainHeading1: string;
  mainHeading2: string;
  mainHeading3: string;
  bottomHeading: string;
  buttonText: string;
  buttonUrl: string;
  leftImage: string;
  leftImageText: string;
  rightImage: string;
  order: string;
};

const georgia = localFont({
  src: [{ path: '../../../../public/font/Georgia.woff2', weight: 'normal', style: 'normal' }],
  display: 'swap',
});

const PageBannerView = ({ content }: AddProps): React.JSX.Element => {
  const [contentData, setContentData] = useState<PageBanner | null>(null);

  useEffect(() => {
    if (content) {
      try {
        const parsed = JSON.parse(content);
        setContentData(parsed);
      } catch (err) {
        console.error('Invalid JSON in banner content:', err);
      }
    }
  }, [content]);

  const isImageFormat = (url?: string): boolean =>
    !!url && /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);

  const headingClass = `${georgia.className || 'font-serif'} capitalize text-left font-medium text-[40px] md:text-[55px] lg:text-[75px] leading-[55px] md:leading-[70px] lg:leading-[92px]`;

  return (
    <section className="bg-[rgb(42,108,101)] w-full h-[850px] p-4">
      <div className="flex flex-col sm:flex-row max-w-[1370px] w-full mx-auto">
        {/* Left Column */}
        <div className="flex-[1.2] lg:ml-16 md:ml-5 sm:ml-1">
          <p className="font-Roboto text-white text-[25px] font-normal leading-9 mt-[50px]">
            {contentData?.topHeading}
          </p>

          <h1 className={`text-[#DAA520] border-b-4 border-[#DAA520] rounded-md ${headingClass}`}>
            {contentData?.mainHeading1}
          </h1>

          <h2 className={`text-white ${headingClass}`}>{contentData?.mainHeading2}</h2>

          <h3 className={`text-white ${headingClass}`}>{contentData?.mainHeading3}</h3>

          <p className="text-white font-sans text-[19px] font-normal leading-6 mt-[20px]">
            {contentData?.bottomHeading}
          </p>

          {/* CTA Button */}
          <div className="mt-[30px]">
            <Link href={contentData?.buttonUrl || '#'} passHref>
              <Button
                size="default"
                variant="default"
                className="text-white font-Roboto font-medium text-[20px] bg-[#DAA520] rounded px-[60px] py-[10px] h-[51px] transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-black hover:text-white"
              >
                {contentData?.buttonText}
              </Button>
            </Link>
          </div>

          {/* Lower Content */}
          <div className="flex flex-col md:flex-row w-full gap-6 mt-[30px]">
            <div className="flex-1">
              {isImageFormat(contentData?.leftImage) && (
                <Image
                  src={contentData?.leftImage || "/logo.png"}
                  alt="Left image"
                  width={300}
                  height={80}
                  priority
                  quality={50}
                  sizes="(max-width: 600px) 300px, (max-width: 1024px) 600px, 993px"
                  className="transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                />
              )}
            </div>
            <div className="flex-1">
              <p className="font-Roboto text-white text-[23px] font-normal leading-8 mt-4">
                {contentData?.leftImageText}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 hidden md:block">
          {isImageFormat(contentData?.rightImage) && (
            <Image
              src={contentData?.rightImage || "/logo.png"}
              alt="Right image"
              width={523}
              height={750}
              priority
              quality={50}
              sizes="(max-width: 600px) 300px, (max-width: 1024px) 600px, 993px"
              className="transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:backdrop-blur-md"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default PageBannerView;