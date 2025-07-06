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
        origin: homeUrl || "",
        'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=60',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=3600',
      },
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
        {sections.map((section: Sections, idx) => {
          const props = { content: section.content };
          switch (section.title) {
            case 'BlankHtml': return <BlankHtmlView key={idx} {...props} />;
            case 'PageBanner': return <PageBannerView key={idx} {...props} />;
            case 'LeftSideContactFormtRightSideText': return <LeftSideContactFormtRightSideTextViewView key={idx} {...props} />;
            case 'LeftSideTextRightSideContactForm': return <LeftSideTextRightSideContactFormViewView key={idx} {...props} />;
            case 'LeftSideImageRightSideContactForm': return <LeftSideImageRightSideContactFormView key={idx} {...props} />;
            case 'LeftSideTextRightSideImage': return <LeftSideTextRightSideImageView key={idx} {...props} />;
            case 'OneRowThreeColumn': return <OneRowThreeColumnView key={idx} {...props} />;
            case 'LeftSideTextRightSideImageWithButton': return <LeftSideTextRightSideImageWithButtonView key={idx} {...props} />;
            case 'TwoRowTwoColumn': return <TwoRowTwoColumnView key={idx} {...props} />;
            case 'OneRowTwoColumn': return <OneRowTwoColumnView key={idx} {...props} />;
            case 'TopTextBottomContactForm': return <TopTextBottomContactFormView key={idx} {...props} />;
            case 'LeftSideImageRightSideText': return <LeftSideImageRightSideTextView key={idx} {...props} />;
            case 'FAQ': return <FAQView key={idx} {...props} />;
            case 'Blog': return <LatestBlogArticle key={idx} {...props} />;
            default: return null;
          }
        })}


      </>
    );
  }
}
