"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Pagination from "../components/Pagination";
import { useSearchParams } from "next/navigation";
import { Post } from "@/lib/types/types";
import { selectBlogCategories } from "../store/slice/dataSlice";
import { useAppSelector } from "../store/hooks/hooks";

const baseUrl = process.env.NEXT_PUBLIC_API;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

interface PaginatedResponse {
  data: Post[];
  totalBlogsCount: number;
  totalBlogs: number;
}
export const runtime = 'edge';

const fetchPosts = async (page: number, limit: number, catId?: string): Promise<PaginatedResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(catId && { catId }),
  });

  const res = await fetch(`${baseUrl}/blog?${params.toString()}`, {
    headers: { origin: basePath ?? "" },
    cache: "no-store",
  });

  const response = await res.json();
  return {
    data: response?.data?.blogsList || [],
    totalBlogsCount: response?.data?.totalBlogsCount || 0,
    totalBlogs: response?.data?.totalBlogs || 0,
  };
};

const Page: React.FC = () => {
  const searchParams = useSearchParams();
  const BlogCategories = useAppSelector(selectBlogCategories);

  const category = searchParams.get("category") ?? "";
  const [catId, setCatId] = useState<string>("");
  const [catName, setCatName] = useState<string>("Latest");
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showNotFound, setShowNotFound] = useState<boolean>(false);
  const limit = 6;

  useEffect(() => {
    const matchedCat = BlogCategories?.find(item => item.slug === category);
    setCatId(matchedCat?._id || "");
    setCatName(matchedCat?.title || "Latest");
  }, [category, BlogCategories]);

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      setShowNotFound(false);
      //  console.log("Loading posts for category:", catId, "Page:", page);
      const { data, totalBlogsCount } = await fetchPosts(page, limit, catId);
      setPosts(data);
      setTotal(totalBlogsCount);
      setIsLoading(false);

      if (data.length === 0) {
        setTimeout(() => setShowNotFound(true), 2000);
      }
    };

    if (BlogCategories && BlogCategories?.length > 0) loadPosts();
  }, [catId, BlogCategories, page]);

  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isImageFormat = (url?: string) => url && /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(url);

  return (
    <div className="max-w-[1370px] w-full m-auto mb-24 text-center">
      <div className="bg-[#003a3a] py-5 md:py-20 mb-5 md:mb-8 lg:mb-12">
        <h2 className="text-white">
          {catName} <span className="text-[#DAA520]">Blogs</span>
        </h2>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 min-[460px]:grid-cols-2 md:grid-cols-3 gap-3 max-w-[95%] m-auto text-center">
            {posts && posts.map((post, index) => (
              <div key={index}>
                {isImageFormat(post.image) && (
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={419}
                    height={223}
                    quality={60}
                    priority={index < 3}
                    sizes="(max-width: 600px) 300px, (max-width: 1024px) 600px, 993px"
                    className="transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 mb-5"
                  />
                )}
                <div className="max-w-[90%] m-auto text-left mb-7">
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="text-[25px] text-black py-5 break-words cursor-pointer capitalize font-georgia font-medium leading-[35px]"
                  >
                    {post.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <Pagination currentPage={page} totalPage={totalPages} onPageChange={handlePageChange} />
        </>
      ) : showNotFound ? (
        <h4 className="text-center text-red-600">Blog not found</h4>
      ) : null}
    </div>
  );
};

export default Page;