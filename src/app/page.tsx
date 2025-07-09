import React from "react";
import { fetchData } from "./store/slice/dataSlice";
import { store } from "./store/store";
import { Metadata } from "next";
import CommonPageTemplate from "./components/CommonPageTemplate";


export async function generateMetadata(): Promise<Metadata> {



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



  return (
    <><CommonPageTemplate pageData={state.data} /> </>

  )
}
