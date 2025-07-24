import React from "react";
import { fetchData, fetchDataWithoutCache } from "./store/slice/dataSlice";
import { store } from "./store/store";
import { Metadata } from "next";
import CommonPageTemplate from "./components/CommonPageTemplate";

type Props = {

  searchParams?: Promise<{ [key: string]: string | undefined }>;

}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {

  const resolvedSearchParams = await searchParams;
  const clearCache = resolvedSearchParams?.clearCache === "1" ? "1" : "0";
  if (clearCache === "1") {
    await store.dispatch(fetchDataWithoutCache('home'));
  } else {
    await store.dispatch(fetchData('home'));
  }

  const state = store.getState().data;

  // console.log("home page data on page", state.data);
  return {
    title: state.data?.metaTitle || process.env.SEO_TITLE,
    description: state.data?.metaDescription || process.env.SEO_DES,
  };


}





export default async function Home({ searchParams }: Props) {

  const resolvedSearchParams = await searchParams;
  const clearCache = resolvedSearchParams?.clearCache ?? "0";

  if (clearCache === "1") {
    await store.dispatch(fetchDataWithoutCache('home'));
  } else {
    await store.dispatch(fetchData('home'));
  }

  const state = store.getState().data;



  return (
    <><CommonPageTemplate pageData={state.data} /> </>

  )
}
