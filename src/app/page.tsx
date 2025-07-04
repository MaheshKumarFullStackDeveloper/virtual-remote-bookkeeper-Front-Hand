import React from "react";
import { Page, Sections } from "@/lib/types/types";
import MainLoader from "@/lib/MainLoader";
import BlankHtmlView from "./components/sectionsView/BlankHtmlView";
import LeftSideImageRightSideContactFormView from "./components/sectionsView/LeftSideImageRightSideContactFormView";
import LeftSideTextRightSideImageView from "./components/sectionsView/LeftSideTextRightSideImageView";
import OneRowThreeColumnView from "./components/sectionsView/OneRowThreeColumnView";
import LeftSideTextRightSideImageWithButtonView from "./components/sectionsView/LeftSideTextRightSideImageWithButtonView";
import TwoRowTwoColumnView from "./components/sectionsView/TwoRowTwoColumnView";
import OneRowTwoColumnView from "./components/sectionsView/OneRowTwoColumnView";
import TopTextBottomContactFormView from "./components/sectionsView/TopTextBottomContactFormView";
import LeftSideImageRightSideTextView from "./components/sectionsView/LeftSideImageRightSideTextView";
import FAQView from "./components/sectionsView/FAQView";
import LatestBlogArticle from "./components/LatestBlogArticle";
import PageBannerView from "./components/sectionsView/PageBannerView";
import LeftSideContactFormtRightSideTextViewView from "./components/sectionsView/LeftSideContactFormtRightSideTextView";
import LeftSideTextRightSideContactFormViewView from "./components/sectionsView/LeftSideTextRightSideContactFormView";


const basenewUrl = process.env.NEXT_PUBLIC_API; // Load from .env 


const homeUrl = process.env.NEXT_PUBLIC_BASE_PATH; // Load from .env
async function getPagedata(page: string) {
  //console.log("home URl----", `${baseUrl}/pages?slug=${page}`);
  try {
    const response = await fetch(`${basenewUrl}/page/${page}`, {
      headers: {
        origin: homeUrl ?? ""
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
