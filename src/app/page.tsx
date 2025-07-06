import React from "react";
import { Page, Sections } from "@/lib/types/types";
import dynamic from 'next/dynamic';

const MainLoader = dynamic(() => import('@/lib/MainLoader'), {
  loading: () => <p>Loading...</p>,
});
const BlankHtmlView = dynamic(() => import('./components/sectionsView/BlankHtmlView'), {
  loading: () => <p>Loading...</p>,
});
const LeftSideImageRightSideContactFormView = dynamic(() => import('./components/sectionsView/LeftSideImageRightSideContactFormView'), {
  loading: () => <p>Loading...</p>,
});
const LeftSideTextRightSideImageView = dynamic(() => import('./components/sectionsView/LeftSideTextRightSideImageView'), {
  loading: () => <p>Loading...</p>,
});
const OneRowThreeColumnView = dynamic(() => import('./components/sectionsView/OneRowThreeColumnView'), {
  loading: () => <p>Loading...</p>,
});
const LeftSideTextRightSideImageWithButtonView = dynamic(() => import('./components/sectionsView/LeftSideTextRightSideImageWithButtonView'), {
  loading: () => <p>Loading...</p>,
});
const TwoRowTwoColumnView = dynamic(() => import('./components/sectionsView/TwoRowTwoColumnView'), {
  loading: () => <p>Loading...</p>,
});
const OneRowTwoColumnView = dynamic(() => import('./components/sectionsView/OneRowTwoColumnView'), {
  loading: () => <p>Loading...</p>,
});
const TopTextBottomContactFormView = dynamic(() => import('./components/sectionsView/TopTextBottomContactFormView'), {
  loading: () => <p>Loading...</p>,
});
const LeftSideImageRightSideTextView = dynamic(() => import('./components/sectionsView/LeftSideImageRightSideTextView'), {
  loading: () => <p>Loading...</p>,
});
const FAQView = dynamic(() => import('./components/sectionsView/FAQView'), {
  loading: () => <p>Loading...</p>,
});
const LatestBlogArticle = dynamic(() => import('./components/LatestBlogArticle'), {
  loading: () => <p>Loading...</p>,
});
const PageBannerView = dynamic(() => import('./components/sectionsView/PageBannerView'), {
  loading: () => <p>Loading...</p>,
});
const LeftSideContactFormtRightSideTextViewView = dynamic(() => import('./components/sectionsView/LeftSideContactFormtRightSideTextView'), {
  loading: () => <p>Loading...</p>,
});
const LeftSideTextRightSideContactFormViewView = dynamic(() => import('./components/sectionsView/LeftSideTextRightSideContactFormView'), {
  loading: () => <p>Loading...</p>,
});



const basenewUrl = process.env.NEXT_PUBLIC_API; // Load from .env 


const homeUrl = process.env.NEXT_PUBLIC_BASE_PATH; // Load from .env
async function getPagedata(page: string) {
  //console.log("home URl----", `${baseUrl}/pages?slug=${page}`);
  try {
    const response = await fetch(`${basenewUrl}/page/${page}`, {
      headers: {
        origin: homeUrl ?? "",
        'Cache-Control': 'public, s-maxage=1',
        'CDN-Cache-Control': 'public, s-maxage=60',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=3600',
      }
    });

    // Check if response is JSON before parsing
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      const dataPage = data?.data;
      if (dataPage?.sections?.length > 0) {
        return dataPage;
      } else {
        return {
          slug: page,
          title: "Page not Found",
        };
      }
    } else {
      console.error("Invalid content type or non-JSON response:", await response.text());
      return {
        slug: page,
        title: "Page not Found",
      };
    }

  } catch (error) {
    console.error("Failed to fetch metadata:", error);
    return undefined;
  }
}




export default async function Home() {

  const HomeContent = await getPagedata('home') as Page;
  const sections = HomeContent?.sections;

  if (!HomeContent || sections === undefined || sections === null) {
    return <MainLoader />;


  } else if (HomeContent?.title === 'Page not Found') {
    return (<h1 className="text-black">Page not Found</h1>);

  } else {



    return (
      <>
        {sections && sections.map((section: Sections, index) => (
          <React.Fragment key={index}>
            {section.title === 'BlankHtml' && <BlankHtmlView content={section.content} />}
            {section.title === 'PageBanner' && <PageBannerView content={section.content} />}
            {section.title === 'LeftSideContactFormtRightSideText' && <LeftSideContactFormtRightSideTextViewView content={section.content} />}
            {section.title === 'LeftSideTextRightSideContactForm' && <LeftSideTextRightSideContactFormViewView content={section.content} />}

            {section.title === 'LeftSideImageRightSideContactForm' && <LeftSideImageRightSideContactFormView content={section.content} />}
            {section.title === 'LeftSideTextRightSideImage' && <LeftSideTextRightSideImageView content={section.content} />}
            {section.title === 'OneRowThreeColumn' && <OneRowThreeColumnView content={section.content} />}
            {section.title === 'LeftSideTextRightSideImageWithButton' && <LeftSideTextRightSideImageWithButtonView content={section.content} />}
            {section.title === 'TwoRowTwoColumn' && <TwoRowTwoColumnView content={section.content} />}
            {section.title === 'OneRowTwoColumn' && <OneRowTwoColumnView content={section.content} />}
            {section.title === 'TopTextBottomContactForm' && <TopTextBottomContactFormView content={section.content} />}
            {section.title === 'LeftSideImageRightSideText' && <LeftSideImageRightSideTextView content={section.content} />}
            {section.title === 'FAQ' && <FAQView content={section.content} />}
            {section.title === 'Blog' && <LatestBlogArticle content={section.content} />}
          </React.Fragment>
        ))}

      </>
    );
  }
}
