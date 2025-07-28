'use client';

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';

type AddProps = {
  content: string;
};

type LeftSideTextRightSideImageWithButton = {
  buttonUrl: string;
  buttonText: string;
  heading: string;
  description: string;
  image: string;
  order: string;
};

const isImageFormat = (url?: string): boolean => {
  if (!url) return false;

  try {
    const parsedUrl = new URL(url); // Throws if invalid URL
    const isValidFormat = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(parsedUrl.pathname);
    return isValidFormat;
  } catch {
    return false;
  }
};

export default function LeftSideTextRightSideImageWithButtonView({
  content,
}: AddProps): React.JSX.Element {
  const [contentData, setContentData] = useState<LeftSideTextRightSideImageWithButton | null>(null);

  useEffect(() => {
    if (!content) return;
    try {
      const parsed = JSON.parse(content) as LeftSideTextRightSideImageWithButton;
      setContentData(parsed);
    } catch (err) {
      console.error('Invalid JSON in section:', err);
    }
  }, [content]);

  const preloadImage = isImageFormat(contentData?.image);

  return (
    <section className="flex flex-col md:flex-row my-5 md:my-14 bg-[#16252D] max-w-[1420px] w-full mx-auto px-5 md:px-8 py-6">
      {preloadImage && (
        <Head>
          <link
            rel="preload"
            as="image"
            href={contentData!.image}
            imageSrcSet={`${contentData!.image} 1x`}
            imageSizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Head>
      )}

      <div className="flex-1 py-2 px-5">
        <h2 className="text-[#DAA520] text-left ">{contentData?.heading}</h2>
        <div
          className="text-left p-6 pt-4 singleBlogPage pagesec1 font-mono text-white text-base leading-7"
          dangerouslySetInnerHTML={{ __html: contentData?.description ?? '' }}
        />
        <Link href={contentData?.buttonUrl || '#'} passHref>
          <Button
            size="lg"
            variant="default"
            className="bg-[#DAA520] text-black mt-10 px-10 ml-3 mb-6 text-[16px] hover:bg-[#DAA520]  hover:-translate-y-1 hover:scale-90 hover:backdrop-blur-md"
          >
            {contentData?.buttonText} <ArrowRightIcon className="h-5 w-5 " />
          </Button>
        </Link>
      </div>

      <div className="flex-1 p-2">
        {preloadImage && (
          <Image
            src={contentData!.image}
            alt="section image"
            width={720}
            height={352}
            quality={60}
            priority
            sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 720px"
            className="mt-7 rounded transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:backdrop-blur-md"
          />
        )}
      </div>
    </section>
  );
}