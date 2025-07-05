"use client";
import Image from "next/image";

const baseUrl = process.env.NEXT_PUBLIC_API; // Load from .env


interface PaginatedResponse {
  data: Post[];
}
//blog?page=${page}&limit=${limit}

const homeUrl = process.env.NEXT_PUBLIC_BASE_PATH; // Load from .env

const fetchPosts = async (
  limit?: number,
  categoryId?: string
): Promise<PaginatedResponse> => {
  const params = new URLSearchParams({
    page: "1",
    ...(limit && { limit: limit.toString() }),
    ...(categoryId && categoryId !== "" && { categoryId })
  });
  console.log("blog serch", `${baseUrl}/blog?${params.toString()}`)
  const res = await fetch(`${baseUrl}/blog?${params.toString()}`, {
    headers: {
      origin: homeUrl ?? ""
    }
  });
  const response = await res.json();
  console.log("blog list", response.data.blogsList)
  return { data: response.data.blogsList };
};


type AddProps = {
  content: string;
};

type Blog = {
  heading: string;
  description: string;
  categorySlug: string;
};


import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { useAppSelector } from "../store/hooks/hooks";
import { selectBlogCategories } from "../store/slice/dataSlice";
import { Post } from "@/lib/types/types";

function LatestBlogArticle({ content }: AddProps): React.JSX.Element {

  const [categoryId, setCategoryId] = useState<string>("");
  const [contentData, setcontentData] = useState<Blog | null>(null);
  const BlogCategories = useAppSelector(selectBlogCategories);
  const [posts, setPosts] = useState<Post[]>([]); // Explicitly typed

  useEffect(() => {
    if (content !== "") {
      const Details = JSON.parse(content);

      setcontentData(Details); // still setting state for reuse

      const match = BlogCategories?.find(
        item => item.slug === Details.categorySlug
      );
      if (match) setCategoryId(match._id);
    }
  }, [content, BlogCategories]);




  useEffect(() => {
    setPosts([]);
    if (categoryId && BlogCategories && BlogCategories.length > 0) {

      const loadPosts = async () => {
        const { data } = await fetchPosts(3, categoryId);
        setPosts(data);
      };
      loadPosts();

    }
  }, [categoryId, BlogCategories]);

  const isImageFormat = (imageUrl: string | undefined): boolean => {
    return !!imageUrl && /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(imageUrl);
  };

  return (<>

    <div className="my-5 md:my-8 lg:my-11 max-w-[1370px]  text-center  w-full m-auto p-5">
      <h2>{contentData?.heading}</h2>
      <p className=" my-12 text-center text-[#596475]">{contentData?.description}</p>
      {posts.length !== 0 ? (
        <>
          <div className="flex flex-col md:flex-row my-1 md:my-5  max-w-[1370px] w-full  m-auto p-1 md:p-5">


            {posts.map((post, index) => (
              <div key={index} className="flex-1 p-2 
                justify-center">
                {isImageFormat(post?.image) ? (
                  <Image quality={50} priority
                    sizes="(max-width: 600px) 300px, (max-width: 1024px) 600px, 993px"

                    src={`${post.image}` || "/logo.png"}
                    width={419}
                    height={236}
                    alt={post.title}
                    className="transition delay-150 duration-300 m-auto ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 mb-5"
                  ></Image>
                ) : (<></>)}

                <div className=" max-w-[90%] w-full m-auto text-center mb-7">
                  <Link className="break-words block text-center text-[25px] capitalize font-georgia text-black font-medium p-5 leading-[35px]" href={`/blogs/${post.slug}`}>{post.title} </Link>
                </div>

              </div>
            ))}
          </div>

        </>
      ) : (
        <><h3>Not Found</h3></>
      )}

      <Link className="my-20 mt-16 mx-auto float-none" href={`/blogs?category=${contentData?.categorySlug}`}> <Button size="lg" variant="default" className="bg-[#DAA520] hover:bg-[#DAA520] cursor-alias transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110  text-white  px-20 py-1 text-[16px]" >View More  <ArrowRightIcon className="h-5 w-5" />
      </Button></Link>
    </div>
  </>);
}

export default LatestBlogArticle;
