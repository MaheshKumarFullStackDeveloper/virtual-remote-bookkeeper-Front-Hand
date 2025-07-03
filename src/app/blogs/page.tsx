"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Pagination from '../components/Pagination';
import { useSearchParams } from 'next/navigation';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

const baseUrl = process.env.NEXT_PUBLIC_API; // Load from .env
//import { toggleLoginDialog } from '../store/slice/userSlice';

// Define the Post interface
interface Post {
  id: number;
  title: string;
  created: string;
  image: string;
  category: string;
  slug: string;
}

// Define the response structure for paginated data
interface PaginatedResponse {
  data: Post[];
  total: number;
}

const fetchPosts = async (
  page: number,
  limit: number,
  //category?: string // Optional parameter for category
): Promise<PaginatedResponse> => {
  const homeUrl = process.env.NEXT_PUBLIC_BASE_PATH; // Load from .env
  const res = await fetch(`${baseUrl}/blog?page=${page}&limit=${limit}`, {
    headers: {
      origin: homeUrl ?? ""
    }
  });
  const response = await res.json();
  const total = 4;
  return { data: response.data.blogsList, total };
};


const Page: React.FC = () => {
  const searchParams = useSearchParams();
  const blogCategories = useSelector((state: RootState) => state.data.blogCategories);
  const category = searchParams.get('category') as string | undefined;
  const [posts, setPosts] = useState<Post[]>([]); // Explicitly typed
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const limit = 3;

  useEffect(() => {
    const loadPosts = async () => {

      const { data, total } = await fetchPosts(page, limit);
      setPosts(data);
      setTotal(total);
    };

    loadPosts();
  }, [page]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="max-w-[1370px] w-full m-auto  justify-between  mb-24 text-center ">
      <div className=" bg-[#003a3a] w-full m-auto py-5 md:py-20 mb-5 md:mb-8 lg:mb-12 text-center">
        <h2 className="text-[#fff]  ">{category !== undefined ? blogCategories[category] : "Latest"}
          {" "} <span className="text-[#DAA520]">Blogs </span>
        </h2>

      </div>
      {posts.length !== 0 ? (
        <>
          <div className=" grid  grid-cols-1  min-[460px]:grid-cols-2  md:grid-cols-3  gap-3   max-w-[95%] justify-between m-auto  text-center  ">
            {posts.map((post, index) => (
              <div key={index} className=" ">
                <Image priority
                  sizes="(max-width: 600px) 300px, (max-width: 1024px) 600px, 993px"

                  src={`${post.image}` || "/default-image.png"}
                  width={419}
                  height={223}
                  alt={post.title}
                  className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 mb-5"
                ></Image>
                <div className=" max-w-[90%] w-full m-auto text-left mb-7">
                  <Link className="text-[25px] text-black py-5 break-words cursor-pointer capitalize font-georgia font-medium leading-[35px] " href={`/blogs/${post.slug}`}>{post.title}</Link>
                </div>

              </div>
            ))}
          </div>
          <Pagination currentPage={page} totalPage={totalPages} onPageChange={handlePageChange} />
        </>
      ) : (
        <>not fond</>
      )}

    </div>
  );
};

export default Page;