'use client';

import React, { useEffect, useState } from 'react';
import ContactForm from '../ContactForm';

type AddProps = {
  content: string;
};

type TopTextBottomContactForm = {
  heading: string;
  description: string;
};

export default function TopTextBottomContactFormView({ content }: AddProps): React.JSX.Element {
  const [contentData, setContentData] = useState<TopTextBottomContactForm | null>(null);

  useEffect(() => {
    if (!content) return;
    try {
      const parsed = JSON.parse(content) as TopTextBottomContactForm;
      setContentData(parsed);
    } catch (err) {
      console.error('Invalid JSON in TopTextBottomContactFormView:', err);
    }
  }, [content]);

  return (
    <section className="my-5 md:my-8 lg:my-11 max-w-[1100px] w-full mx-auto px-5 text-center">
      <h2 className="text-2xl font-semibold text-black">{contentData?.heading}</h2>
      <div
        className="my-12 text-[#596475] leading-7"
        dangerouslySetInnerHTML={{ __html: contentData?.description ?? '' }}
      />
      <ContactForm />
    </section>
  );
}