import React from "react";

interface BlogPost {
  domain: string;
  author: string;
  description: string;
  title: string;
  profile: string;
  date: string;
}

interface Posts {
  posts: BlogPost[];
}

const BlogPosts: React.FC<Posts> = ({ posts }) => {
  return (
    <div className="bg-transparent pt-4 text-white w-full">
      <div className="mx-auto px-6 lg:px-8">
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.date}
              className="flex max-w-xl flex-col items-start justify-between"
            >
              <div className="flex items-center gap-x-4 text-xs text-[#6941C6] font-semibold">
                {post.domain}
              </div>
              <div className="group relative">
                <h3 className="mt-3 font-semibold group-hover:text-gray-600 text-white text-2xl">
                  {post.title}
                </h3>
                <p className="mt-5 line-clamp-3 text-[16px] text-white">
                  {post.description}
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <div
                  className="size-10 rounded-full bg-gray-50"
                />
                <div className="text-sm/6">
                  <p className="font-semibold text-white">
                    <span className="absolute inset-0" />
                    {post.author}
                  </p>
                  <p className=" text-white">
                    {post.date}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPosts
