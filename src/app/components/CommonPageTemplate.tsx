
import React from 'react'
import dynamic from 'next/dynamic';
import { Page, Sections } from '@/lib/types/types';

const MainLoader = dynamic(() => import('@/lib/MainLoader'), {
  loading: () => <p>Loading...</p>,
});
const BlankHtmlView = dynamic(() => import('./sectionsView/BlankHtmlView'), {
  loading: () => <p>Loading...</p>,
});
const Redirect404 = dynamic(() => import('./sectionsView/Redirect404'), {
  loading: () => <p>Loading...</p>,
});
const LeftSideImageRightSideContactFormView = dynamic(() => import('./sectionsView/LeftSideImageRightSideContactFormView'), {
  loading: () => <p>Loading...</p>,
});
const LeftSideTextRightSideImageView = dynamic(() => import('./sectionsView/LeftSideTextRightSideImageView'), {
  loading: () => <p>Loading...</p>,
});
const OneRowThreeColumnView = dynamic(() => import('./sectionsView/OneRowThreeColumnView'), {
  loading: () => <p>Loading...</p>,
});
const LeftSideTextRightSideImageWithButtonView = dynamic(() => import('./sectionsView/LeftSideTextRightSideImageWithButtonView'), {
  loading: () => <p>Loading...</p>,
});
const TwoRowTwoColumnView = dynamic(() => import('./sectionsView/TwoRowTwoColumnView'), {
  loading: () => <p>Loading...</p>,
});
const OneRowTwoColumnView = dynamic(() => import('./sectionsView/OneRowTwoColumnView'), {
  loading: () => <p>Loading...</p>,
});
const TopTextBottomContactFormView = dynamic(() => import('./sectionsView/TopTextBottomContactFormView'), {
  loading: () => <p>Loading...</p>,
});
const LeftSideImageRightSideTextView = dynamic(() => import('./sectionsView/LeftSideImageRightSideTextView'), {
  loading: () => <p>Loading...</p>,
});
const FAQView = dynamic(() => import('./sectionsView/FAQView'), {
  loading: () => <p>Loading...</p>,
});
const LatestBlogArticle = dynamic(() => import('./LatestBlogArticle'), {
  loading: () => <p>Loading...</p>,
});
const PageBannerView = dynamic(() => import('./sectionsView/PageBannerView'), {
  loading: () => <p>Loading...</p>,
});
const LeftSideContactFormtRightSideTextViewView = dynamic(() => import('./sectionsView/LeftSideContactFormtRightSideTextView'), {
  loading: () => <p>Loading...</p>,
});
const LeftSideTextRightSideContactFormViewView = dynamic(() => import('./sectionsView/LeftSideTextRightSideContactFormView'), {
  loading: () => <p>Loading...</p>,
});



interface CommonPageTemplateProps {
  pageData: Page | null; // Replace `Page` with the actual shape of your data
}

export default function CommonPageTemplate({ pageData }: CommonPageTemplateProps) {

  const sections = pageData?.sections;
  //console.log("pageData", pageData)
  if (sections === null) {
    return (<MainLoader />);

  } else if (pageData?.title === 'Page not Found') {
    return (<><Redirect404 url="/404" /></>);

  } else {



    return (
      <>

        {pageData?.title === 'Page not Found' && <Redirect404 url="/404" />}
        {sections && sections.map((section: Sections, idx) => {
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
