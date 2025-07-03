// app/blogs/[page]/page.tsx
import SingleBlogContent from "@/app/components/SingleBlogContent";
import type { Metadata } from "next";
const baseUrl = process.env.NEXT_PUBLIC_API; // Load from .env
type Props = {
  params: Promise<{ page: string }>;
};






async function getPagedata(page: string) {
  try {
    const homeUrl = process.env.NEXT_PUBLIC_BASE_PATH; // Load from .env
    const res = await fetch(`${baseUrl}/blog/${page}`, {
      headers: {
        origin: homeUrl ?? ""
      }
    });
    const response = await res.json();
    // console.log("blog data", response)
    if (response?.data && response.data.content) {
      return response.data;
    } else {
      return {
        slug: page,
        title: "",
        category: "",
        created: "",
        meta: {
          title: "",
          description: "",
        },
        photo: "",
        content: "Page not Found",
      };
    }
  } catch (error) {
    console.error("Failed to fetch metadata:", error);
    return undefined;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const newp = await params;

  console.log("check id", newp.page);
  if (newp.page !== "") {
    const state = await getPagedata(newp.page);

    return {
      title: state.data?.metaTitle || process.env.SEO_TITLE,
      description: state.data?.metaDescription || process.env.SEO_DES,
    };
  } else {
    return {
      title: process.env.SEO_TITLE,
      description: process.env.SEO_DES,
    };
  }
}

export default async function Page({ params }: Props) {
  const { page } = await params;
  const state = await getPagedata(page);

  return <> <SingleBlogContent blogData={state} /></>;
}
