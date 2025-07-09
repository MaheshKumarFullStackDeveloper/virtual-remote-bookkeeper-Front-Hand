'use client';

export const runtime = 'edge';

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import { useAppSelector } from '../store/hooks/hooks';
import { selectBlogCategories } from '../store/slice/dataSlice';
import { Post } from '@/lib/types/types';

const baseUrl = process.env.NEXT_PUBLIC_API ?? '';
const homeUrl = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

interface PaginatedResponse {
  data: Post[];
}
interface AddProps {
  content: string;
}
interface Blog {
  heading: string;
  description: string;
  categorySlug: string;
}

const isImageFormat = (url?: string): boolean =>
  !!url && /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);

const fetchPosts = async (limit?: number, categoryId?: string): Promise<PaginatedResponse> => {
  const params = new URLSearchParams({
    page: '1',
    ...(limit && { limit: limit.toString() }),
    ...(categoryId && categoryId !== '' && { categoryId }),
  });

  const res = await fetch(`${baseUrl}/blog?${params.toString()}`, {
    headers: {
      origin: homeUrl,
      'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=60',
      'Vercel-CDN-Cache-Control': 'public, s-maxage=3600',
    },
    cache: 'force-cache',
    next: { revalidate: 60 }, // server cache intent
  });

  const response = await res.json();
  return { data: response?.data?.blogsList ?? [] };
};

const LatestBlogArticle = ({ content }: AddProps): React.JSX.Element => {
  const BlogCategories = useAppSelector(selectBlogCategories);
  const [categoryId, setCategoryId] = useState<string>('');
  const [contentData, setContentData] = useState<Blog | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!content) return;
    try {
      const parsed: Blog = JSON.parse(content);
      setContentData(parsed);
      const matched = BlogCategories?.find((c) => c.slug === parsed.categorySlug);
      if (matched) setCategoryId(matched._id);
    } catch (err) {
      console.error('Failed to parse blog section content:', err);
    }
  }, [content, BlogCategories]);

  useEffect(() => {
    if (!categoryId) return;
    const loadPosts = async () => {
      const { data } = await fetchPosts(3, categoryId);
      setPosts(data);
    };
    loadPosts();
  }, [categoryId]);

  const lcpImage = posts[0]?.image;
  const shouldPreloadLCP = isImageFormat(lcpImage);

  return (
    <section className="my-5 md:my-8 lg:my-11 max-w-[1370px] mx-auto w-full p-5 text-center">
      {shouldPreloadLCP && (
        <Head>
          <link
            rel="preload"
            as="image"
            href={lcpImage!}
            imageSrcSet={`${lcpImage} 1x`}
            imageSizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"

          />
        </Head>
      )}

      <h2 className="">{contentData?.heading}</h2>
      <p className="my-12 text-[#596475]">{contentData?.description}</p>

      {posts.length ? (
        <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-6 p-1 md:p-5">
          {posts.map((post, index) => (
            <div key={post.slug ?? index} className="flex-1 text-center p-2">
              {isImageFormat(post.image) && (
                <Image
                  src={post.image}
                  alt={post.title}
                  width={419}
                  height={236}
                  quality={60}
                  priority={index === 0}
                  sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="mb-5 mx-auto transition duration-300 hover:scale-105 hover:shadow-lg"
                />
              )}

              <Link
                href={`/blogs/${post.slug}`}
                className="break-words block text-left text-[25px] capitalize font-georgia text-black font-medium p-5 leading-[35px]"
              >
                {post.title}
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic mt-8">No articles found.</p>
      )}

      <Link
        href={`/blogs?category=${contentData?.categorySlug ?? ''}`}
        className="mt-16 inline-block"
      >
        <Button
          size="lg"
          variant="default"
          className="bg-[#DAA520] hover:bg-black hover:text-white transition-transform duration-300 px-8 py-2 text-base flex items-center gap-2"
        >
          View More <ArrowRightIcon className="w-5 h-5" />
        </Button>
      </Link>
    </section>
  );
};

export default LatestBlogArticle;