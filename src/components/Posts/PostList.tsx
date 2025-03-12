import { PostCard, PostType } from "./PostCard";
import { rubik } from "@/components/fonts";
import Link from "next/link";
import clsx from "clsx";
import { Locale } from "@/i18n/config";
import {getLocale, getTranslations} from 'next-intl/server';

export const revalidate = 3600;
type PostListProps = {
  isOnlyLast?: boolean;
}
export const PostList = async ({ isOnlyLast }: PostListProps) => {
  
  const lng = (await getLocale()) as Locale;
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "http://localhost:3000";

  const list = await fetch(`${baseUrl}/api/post?lng=${lng}`, {
    cache: "no-store",
  });
  const allList = await list.json();

  const t = await getTranslations('posts');

  if (!allList) {
    return <div></div>;
  }
  const posts = isOnlyLast ? allList.slice(0, 4) : allList;
  return (
    <div className={clsx("flex flex-col mx-2", !isOnlyLast && "py-12")}>
      {isOnlyLast && (
        <div className="flex justify-between px-8 py-8">
          <h2 className={`text-2xl text-primary ${rubik.className}`}>{t("lastPosts")}:</h2>
        </div>
      )}

      <div className={clsx(isOnlyLast && `md:grid grid-cols-2 gap-8`)}>
        {posts.map((post: PostType, index: number) => (
          <PostCard key={`post-${index}`} post={post} />
        ))}
      </div>
      {isOnlyLast && (
        <div className="p-2 mr-4 ml-auto my-4 hover:scale-105 transition-transform ">
          <Link
            href="/posts"
            className="text-center rounded-full p-4 bg-primary text-white shadow-stone-400 shadow-lg"
          >
            {t("gotoPosts")}
          </Link></div>
      )}
    </div>
  );
};
