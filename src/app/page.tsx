import React from "react";
import { fetchData } from "./store/slice/dataSlice";
import { store } from "./store/store";
import { Metadata } from "next";
import CommonPageTemplate from "./components/CommonPageTemplate";

type Props = {

  searchParams?: Promise<{ [key: string]: string | undefined }>;

}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {

  const resolvedSearchParams = await searchParams;
  const clearCache = resolvedSearchParams?.clearCache === "1" ? "1" : "0";


  await store.dispatch(fetchData({ pageSlug: 'home', clearCache }));
  const state = store.getState().data;

  // console.log("home page data on page", state.data);
  return {
    title: state.data?.metaTitle || process.env.SEO_TITLE,
    description: state.data?.metaDescription || process.env.SEO_DES,
  };


}





export default async function Home() {

  const clearCache = "0";
  await store.dispatch(fetchData({ pageSlug: 'home', clearCache }));
  const state = store.getState().data;



  return (
    <><CommonPageTemplate pageData={state.data} /> </>

  )
}
