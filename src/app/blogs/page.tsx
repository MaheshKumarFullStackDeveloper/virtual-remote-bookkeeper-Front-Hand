"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Pagination from '../components/Pagination';
import { useSearchParams } from 'next/navigation';
import { Post } from '@/lib/types/types';
import { selectBlogCategories } from '../store/slice/dataSlice';
import { useAppSelector } from '../store/hooks/hooks';

const baseUrl = process.env.NEXT_PUBLIC_API;

interface PaginatedResponse {
  data: Post[];
  totalBlogsCount: number;
  totalBlogs: number;
}

const fetchPosts = async (
  page: number,
  limit: number,
  catId?: string
): Promise<PaginatedResponse> => {
  const params = new URLSearchParams({
    ...(page && { page: page.toString() }),
    ...(limit && { limit: limit.toString() }),
    ...(catId && catId !== "" && { catId }),
  });

  const homeUrl = process.env.NEXT_PUBLIC_BASE_PATH;
  const res = await fetch(`${baseUrl}/blog?${params.toString()}`, {
    headers: { origin: homeUrl ?? "" }
  });
  const response = await res.json();
  return {
    data: response.data.blogsList,
    totalBlogsCount: response.data?.totalBlogsCount,
    totalBlogs: response.data.totalBlogs,
  };
};

const Page: React.FC = () => {
  const searchParams = useSearchParams();
  const BlogCategories = useAppSelector(selectBlogCategories);
  const category = searchParams.get('category') as string | undefined;
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [catName, setCatName] = useState<string>("");
  const [catId, setCatId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showNotFound, setShowNotFound] = useState<boolean>(false);


  const limit = 6;

  useEffect(() => {
    const match = BlogCategories?.find(item => item.slug === category);
    if (match) {
      setCatId(match._id);
      setCatName(match.title);
    }
  }, [category, BlogCategories]);

  useEffect(() => {
    if (BlogCategories && BlogCategories.length > 0) {
      setPosts([]);
      setIsLoading(true);
      setShowNotFound(false);

      const timer = setTimeout(() => {
        const loadPosts = async () => {
          const { data, totalBlogsCount } = await fetchPosts(page, limit, catId);
          setPosts(data);
          setTotal(totalBlogsCount);
          setIsLoading(false);

          // Trigger "not found" message after 5s only if no posts
          if (data.length === 0) {
            setTimeout(() => setShowNotFound(true), 2000);
          }
        };
        loadPosts();
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [catId, BlogCategories, page]);


  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const totalPages = Math.ceil(total / limit);
  const isImageFormat = (imageUrl: string | undefined): boolean => {
    return !!imageUrl && /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(imageUrl);
  };
  return (
    <div className="max-w-[1370px] w-full m-auto justify-between mb-24 text-center">
      <div className="bg-[#003a3a] w-full py-5 md:py-20 mb-5 md:mb-8 lg:mb-12 text-center">
        <h2 className="text-white">
          {catName !== "" ? catName : "Latest"}{" "}
          <span className="text-[#DAA520]">Blogs</span>
        </h2>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="h-8 w-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : posts.length !== 0 ? (
        <>
          <div className="grid grid-cols-1 min-[460px]:grid-cols-2 md:grid-cols-3 gap-3 max-w-[95%] justify-between m-auto text-center">
            {posts.map((post, index) => (
              <div key={index}>
                {isImageFormat(post?.image) ? (
                  <Image quality={50}
                    priority
                    sizes="(max-width: 600px) 300px, (max-width: 1024px) 600px, 993px"
                    src={`${post.image}` || "/logo.png"}
                    width={419}
                    height={223}
                    alt={post.title}
                    className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 mb-5"
                  />
                ) : (<></>)}
                <div className="max-w-[90%] w-full m-auto text-left mb-7">
                  <Link
                    className="text-[25px] text-black py-5 break-words cursor-pointer capitalize font-georgia font-medium leading-[35px]"
                    href={`/blogs/${post.slug}`}
                  >
                    {post.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPage={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : showNotFound ? (
        <h4>Blog not found</h4>
      ) : null}

    </div>
  );
};

export default Page;