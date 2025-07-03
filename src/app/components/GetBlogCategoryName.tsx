"use client";
import React from 'react'
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import Link from 'next/link';

function GetBlogCategoryName({ category }: { category: string }) {

    const blogCategories = useSelector((state:RootState)=>state.data.blogCategories);
  return (
    <Link href={`/blogs/?category=${category}`} > {category !== undefined ? blogCategories[category] : ""}</Link>
  )
}

export default GetBlogCategoryName