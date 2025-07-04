"use client";
import React from "react";
import Link from "next/link";
import { blogCategoryList } from "@/lib/types/types";

function GetBlogCategoryName({
  category,
}: {
  category: blogCategoryList[] | undefined;
}) {
  if (!category || category.length === 0) return null;

  return (
    <>
      {category.map((cat, index) => (
        <React.Fragment key={index}>
          <Link
            href={`/blogs/?category=${cat.slug}`}
            className="text-blue-600 hover:underline"
          >
            {cat.title}
          </Link>
          {index < category.length - 1 && ", "}
        </React.Fragment>
      ))}
    </>
  );
}

export default GetBlogCategoryName;