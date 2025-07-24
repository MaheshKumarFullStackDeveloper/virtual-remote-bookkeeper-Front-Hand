// app/[page]/page.tsx
import { fetchData, fetchDataWithoutCache } from "../store/slice/dataSlice";
import { store } from "../store/store";
import CommonPageTemplate from "../components/CommonPageTemplate";


import type { Metadata } from "next";


type Props = {
  params: Promise<{ page: string }>,
  searchParams?: Promise<{ [key: string]: string | undefined }>;

}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  // read route params
  const newp = await params
  const resolvedSearchParams = await searchParams;
  const clearCache = resolvedSearchParams?.clearCache ?? "0";



  if (newp.page !== "") {

    if (clearCache === "1") {
      await store.dispatch(fetchDataWithoutCache(newp.page));
    } else {
      await store.dispatch(fetchData(newp.page));
    }

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
  { params, searchParams }: Props
) {

  const newp = await params
  const resolvedSearchParams = await searchParams;
  const clearCache = resolvedSearchParams?.clearCache ?? "0";

  if (clearCache === "1") {
    await store.dispatch(fetchDataWithoutCache(newp.page));
  } else {
    await store.dispatch(fetchData(newp.page));
  }

  const state = store.getState().data;


  return (
    <><CommonPageTemplate pageData={state.data} /> </>

  )
}