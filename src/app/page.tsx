import React from "react";
import { Sections } from "@/lib/types/types";
import dynamic from 'next/dynamic';
import { fetchData } from "./store/slice/dataSlice";
import { store } from "./store/store";
import { Metadata } from "next";

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


type Props = {
  params: Promise<{ page: string }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {



  await store.dispatch(fetchData('home'));
  const state = store.getState().data;

  // console.log("home page data on page", state.data);
  return {
    title: state.data?.metaTitle || process.env.SEO_TITLE,
    description: state.data?.metaDescription || process.env.SEO_DES,
  };


}





export default async function Home() {

  await store.dispatch(fetchData("home"));
  const state = store.getState().data;
  const HomeContent = state.data;
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
