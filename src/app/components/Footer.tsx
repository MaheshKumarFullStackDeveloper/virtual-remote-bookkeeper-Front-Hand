'use client';

import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
  selectfooterCopywrite,
  selectFooterLogo,
  selectFooterMenu,
  selectFooterText,
} from '../store/slice/dataSlice';
import { useAppSelector } from '../store/hooks/hooks';

interface FooterMenu {
  title: string;
  link: string;
}

export default function Footer(): React.JSX.Element {
  const footerLogo = useAppSelector(selectFooterLogo);
  const footerText = useAppSelector(selectFooterText);
  const footerCopywrite = useAppSelector(selectfooterCopywrite);
  const footerMenu: FooterMenu[] | null = useAppSelector(selectFooterMenu);

  const shouldPreloadLogo = typeof footerLogo === 'string';

  return (
    <footer className="bg-black border-b text-white">
      {shouldPreloadLogo && (
        <Head>
          <link
            rel="preload"
            as="image"
            href={footerLogo}
            imageSrcSet={`${footerLogo} 1x`}
            imageSizes="134px"
          />
        </Head>
      )}

      <div className="max-w-[1400px] mx-auto px-4 pt-16 flex flex-col md:flex-row items-center md:items-start justify-between">
        {/* Logo & Description */}
        <div className="flex-1 mb-12 md:mb-0">
          <Link href="/" className="inline-block mb-6">
            {footerLogo && (
              <Image
                src={footerLogo}
                alt="Footer Logo"
                width={134}
                height={134}
                quality={50}
                priority
                sizes="134px"
                className="transition duration-300 hover:scale-110 hover:-translate-y-1 hover:bg-indigo-500"
              />
            )}
          </Link>
          <p className="max-w-md leading-relaxed">{footerText}</p>
        </div>

        {/* Quick Links */}
        <div className="flex-1 text-left px-4">
          <h4 className="text-[1.777rem] font-medium font-sans mb-6">
            <span className="text-[#fe6b01] text-[30px] pr-2">-</span>Quick Links
          </h4>
          <ul className="flex flex-col gap-2">
            {footerMenu?.map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.link}
                  className="block font-medium uppercase text-sm tracking-[0.188rem] hover:text-[#2bbdcc] transition-colors"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto border-t border-[#0e1527] py-6 px-4 mt-12">
        <p className="text-sm text-left">{footerCopywrite}</p>
      </div>
    </footer>
  );
}