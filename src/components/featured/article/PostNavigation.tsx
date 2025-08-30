"use client";

import Link from "next/link";

interface PostNavigationProps {
  previousPost?: { href: string; title: string };
  nextPost?: { href: string; title: string };
}

const PostNavigation = ({ previousPost, nextPost }: PostNavigationProps) => {
  return (
    <div className="flex justify-between border-y border-gray-200 py-6 mb-10">
      {nextPost ? (
        <Link
          href={nextPost.href}
          className="text-foreground hover:text-secondary max-w-[45%]"
        >
          <span className="text-sm">« 次の記事へ</span>
          <p className="font-semibold truncate">{nextPost.title}</p>
        </Link>
      ) : (
        <div />
      )}
      {previousPost ? (
        <Link
          href={previousPost.href}
          className="text-foreground hover:text-secondary max-w-[45%] text-right"
        >
          <span className="text-sm">前の記事へ »</span>
          <p className="font-semibold truncate">{previousPost.title}</p>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
};

export default PostNavigation;
