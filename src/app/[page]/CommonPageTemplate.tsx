
import React from 'react'
import LatestBlogArticle from "../components/LatestBlogArticle";
import MainLoader from "@/lib/MainLoader";
import { Page, Sections } from '@/lib/types/types';
import BlankHtmlView from '../components/sectionsView/BlankHtmlView';
import LeftSideImageRightSideContactFormView from '../components/sectionsView/LeftSideImageRightSideContactFormView';
import LeftSideTextRightSideImageView from '../components/sectionsView/LeftSideTextRightSideImageView';
import OneRowThreeColumnView from '../components/sectionsView/OneRowThreeColumnView';
import LeftSideTextRightSideImageWithButtonView from '../components/sectionsView/LeftSideTextRightSideImageWithButtonView';
import TwoRowTwoColumnView from '../components/sectionsView/TwoRowTwoColumnView';
import OneRowTwoColumnView from '../components/sectionsView/OneRowTwoColumnView';
import TopTextBottomContactFormView from '../components/sectionsView/TopTextBottomContactFormView';
import LeftSideImageRightSideTextView from '../components/sectionsView/LeftSideImageRightSideTextView';
import FAQView from '../components/sectionsView/FAQView';
import PageBannerView from '../components/sectionsView/PageBannerView';
import LeftSideContactFormtRightSideTextViewView from '../components/sectionsView/LeftSideContactFormtRightSideTextView';
import LeftSideTextRightSideContactFormViewView from '../components/sectionsView/LeftSideTextRightSideContactFormView';
import Redirect404 from '../components/sectionsView/Redirect404';


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
