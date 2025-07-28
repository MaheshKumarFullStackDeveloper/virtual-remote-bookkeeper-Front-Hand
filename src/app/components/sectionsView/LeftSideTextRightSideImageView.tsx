'use client';

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

type AddProps = {
  content: string;
};

type LeftSideTextRightSideImage = {
  heading: string;
  description: string;
  image: string;
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

export default function LeftSideTextRightSideImageView({ content }: AddProps): React.JSX.Element {
  const [contentData, setContentData] = useState<LeftSideTextRightSideImage | null>(null);

  useEffect(() => {
    if (!content) return;
    try {
      const parsed = JSON.parse(content) as LeftSideTextRightSideImage;
      setContentData(parsed);
    } catch (error) {
      console.error('Invalid content data:', error);
    }
  }, [content]);

  const shouldPreload = isImageFormat(contentData?.image);

  return (
    <section className="my-5 md:my-8 lg:my-11 max-w-[1370px] w-full mx-auto px-5">
      {shouldPreload && (
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


      <div className="my-5 md:my-8 lg:my-11 max-w-[1370px] w-full m-auto p-5">
        <h3 >{contentData?.heading}</h3>
      </div>
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div
          className="flex-1 mt-1 lg:mt-16 text-[18px] font-mono text-[#596475] p-5 pr-8 leading-[1.66em] "
          dangerouslySetInnerHTML={{ __html: contentData?.description ?? '' }}
        />

        <div className="flex-1">
          {shouldPreload && (
            <Image
              src={contentData!.image}
              alt="Section Image"
              width={623}
              height={352}
              quality={60}
              priority
              sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="rounded transition duration-300 ease-in-out hover:scale-105 hover:backdrop-blur-md"
            />
          )}
        </div>
      </div>
    </section>
  );
}