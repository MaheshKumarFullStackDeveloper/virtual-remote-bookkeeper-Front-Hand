'use client';

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import QuickContact from '../QuickContact';

type AddProps = {
  content: string;
};

type BlankHtml = {
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

export default function LeftSideImageRightSideContactFormView({ content }: AddProps): React.JSX.Element {
  const [contentData, setContentData] = useState<BlankHtml | null>(null);

  useEffect(() => {
    if (!content) return;
    try {
      const parsed = JSON.parse(content) as BlankHtml;
      setContentData(parsed);
    } catch (err) {
      console.error('Invalid content data for LeftImage/RightForm:', err);
    }
  }, [content]);

  const showImage = isImageFormat(contentData?.image);

  return (
    <section className="max-w-screen-xl mx-auto w-full p-5 my-10">
      {showImage && (
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

      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="flex-1 p-4">
          {showImage && (
            <Image
              src={contentData!.image}
              alt="section-image"
              width={625}
              height={352}
              quality={60}
              priority
              sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="transition duration-300 ease-in-out hover:scale-105 rounded"
            />
          )}
        </div>
        <div className="w-full sm:flex-1  p-6">
          <div className=' bg-black text-white border border-white p-6 text-left shadow-md'>
            <QuickContact /></div>
        </div>
      </div>
    </section>
  );
}