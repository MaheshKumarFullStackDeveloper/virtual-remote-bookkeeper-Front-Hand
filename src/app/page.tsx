
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
import { Page, Sections } from "@/lib/types/types";
import LatestBlogArticle from "./components/LatestBlogArticle";
import React from "react";


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
    const data = await response.json();
    const dataPage = data?.data;
    // console.log("home URl----", dataPage);
    if (dataPage.sections && dataPage?.sections?.length > 0) {
      return dataPage;
    } else {
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

  if (sections === null) {
    return (<MainLoader />);

  } else if (HomeContent?.title === 'Page not Found') {
    return (<h1 className="text-black">Page not Found</h1>);

  } else {



    return (
      <>
        {sections && sections.map((section: Sections, index) => (
          <React.Fragment key={index}>
            {/*    {section.title === 'BlankHtml' && <BlankHtmlView content={section.content} />} */}
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
