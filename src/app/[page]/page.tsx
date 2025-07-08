// app/[page]/page.tsx
import { fetchData } from "../store/slice/dataSlice";
import { store } from "../store/store";
import CommonPageTemplate from "./CommonPageTemplate";


import type { Metadata } from "next";


type Props = {
  params: Promise<{ page: string }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  // read route params
  const newp = await params

  //console.log("check id", newp.page);
  if (newp.page !== "") {

    await store.dispatch(fetchData(newp.page));
    const state = store.getState().data;

    // console.log("page data on page", state.data);
    return {
      title: state.data?.metaTitle || process.env.SEO_TITLE,
      description: state.data?.metaDescription || process.env.SEO_DES,
    };

  } else {
    return {
      title: process.env.SEO_TITLE,
      description: process.env.SEO_DES
    }
  }
}

export default async function Page(
  { params }: Props
) {

  const { page } = await params
  await store.dispatch(fetchData(page));
  const state = store.getState().data;


  return (
    <><CommonPageTemplate pageData={state.data} /> </>

  )
}