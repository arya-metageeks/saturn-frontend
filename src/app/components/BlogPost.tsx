import { Button } from "@headlessui/react";
import React from "react";
import posts from "../data/blogPosts.json";
import BlogPosts from "./Shared/BlogPosts";

const BlogPost = () => {
  return (
    <div className="w-full flex flex-col px-[84px]">
      <div className="py-[96px] flex justify-between">
        <div className="flex flex-col gap-5">
          <h3 className="font-semibold text-[16px] text-[#6941C6]">Our blog</h3>
          <h2 className="text-white font-semibold text-4xl leading-[44px]">
            Lastest blog posts
          </h2>
          <p className="leading-8 text-xl text-white">
            Tool and strategies modern teams need to help their companies grow.
          </p>
        </div>
        <div className="flex justify-end items-start">
          <Button className="px-5 py-3 text-center text-white rounded-xl bg-[#6941C6] font-bold">
            View all posts
          </Button>
        </div>
      </div>
      <BlogPosts posts={posts} />
    </div>
  );
};

export default BlogPost;
