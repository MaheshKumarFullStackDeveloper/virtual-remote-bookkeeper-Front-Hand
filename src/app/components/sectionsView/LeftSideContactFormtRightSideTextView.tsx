'use client';

import React, { useEffect, useState } from 'react';
import QuickContact from '../QuickContact';

type AddProps = {
  content: string;
};

type SectionData = {
  heading: string;
  subHeading: string;
  description: string;
};

export default function LeftSideContactFormtRightSideTextViewView({
  content,
}: AddProps): React.JSX.Element {
  const [contentData, setContentData] = useState<SectionData | null>(null);

  useEffect(() => {
    if (!content) return;
    try {
      const parsed = JSON.parse(content) as SectionData;
      setContentData(parsed);
    } catch (err) {
      console.error('Invalid content data in Contact/Text section:', err);
    }
  }, [content]);

  return (
    <section className="max-w-[1370px] w-full mx-auto px-5 sm:px-8 my-10">
      <header className="text-center mb-8">
        <h2 className="text-3xl font-semibold">{contentData?.heading}</h2>
        <p className="text-[#596475] mt-2">{contentData?.subHeading}</p>
      </header>

      <div className="flex flex-col md:flex-row gap-8 items-start pt-6">
        <div className="flex-1 bg-black text-white border-white border-[7px] p-6 text-left">
          <QuickContact />
        </div>

        <div className="flex-1 text-center px-4">
          {contentData?.description && (
            <div
              className="pagesec text-left"
              dangerouslySetInnerHTML={{ __html: contentData.description }}
            />
          )}
        </div>
      </div>
    </section>
  );
}