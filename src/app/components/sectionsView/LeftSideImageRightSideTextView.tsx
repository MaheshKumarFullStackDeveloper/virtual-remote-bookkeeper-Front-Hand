'use client';

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

type AddProps = {
  content: string;
};

type LeftSideImageRightSideText = {
  heading: string;
  description: string;
  image: string;
};

const isImageFormat = (url?: string): boolean =>
  !!url && /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);

export default function LeftSideImageRightSideTextView({ content }: AddProps): React.JSX.Element {
  const [contentData, setContentData] = useState<LeftSideImageRightSideText | null>(null);

  useEffect(() => {
    if (!content) return;
    try {
      const parsed = JSON.parse(content) as LeftSideImageRightSideText;
      setContentData(parsed);
    } catch (err) {
      console.error('Failed to parse LeftSideImageRightSideText data:', err);
    }
  }, [content]);

  const shouldPreload = contentData?.image && isImageFormat(contentData.image);

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

      <div className="flex flex-col md:flex-row items-start gap-6 p-2 md:p-5">
        {/* Image Column */}
        <div className="flex-1 p-2">
          {shouldPreload && (
            <Image
              src={contentData!.image}
              alt="Banner section image"
              width={623}
              height={352}
              quality={60}
              priority
              sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="transition duration-300 ease-in-out hover:scale-105 hover:backdrop-blur-md rounded"
            />
          )}
        </div>

        {/* Text Column */}
        <div className="flex-1 px-5  text-[#596475] leading-[1.66em]">
          <h2 className="text-left left mb-4">{contentData?.heading}</h2>
          <div
            className="font-mono"
            dangerouslySetInnerHTML={{
              __html: contentData?.description ?? '',
            }}
          />
        </div>
      </div>
    </section>
  );
}