"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


interface Redirect404Props {
  url: string;
}

export default function Redirect404({ url }: Redirect404Props) {

  const router = useRouter();

  useEffect(() => {
    if (url) {
      router.replace(url);
    }
  }, [url, router]);

  return null; // Nothing visual to render

}