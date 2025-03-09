import Link from "next/link";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";

export type PostType = {
    image: string;
    slug: string;
    title: string;
    description: string;
    date: string;
}

type PostProps = {
  post: PostType;
};

export const PostCard = async ({ post }: PostProps) => {

  const lng = await getLocale();
  const t = await getTranslations('posts');
  return (
    <Link href={`/posts/${post.slug}`}>
      <div className="flex flex-col font-sans bg-slate-50 p-2 mb-4 border-2 rounded-2xl shadow-xl hover:scale-[101%] hover:bg-white  hover:shadow-primary/50 duration-500">
        <div className="w-full flex flex-col justify-between px-4">
          <div className="text-xs font-light text-slate-400">
            {new Date(post.date).toLocaleDateString()}
          </div>
          <h3 className="py-2 font-semibold text-sm lg:text-base text-slate-900">
            {post.title}
          </h3>
        </div>

        <div className="mx-4">
          <div className="relative w-16 h-16 float-left mr-4">
            <Image
              className="rounded-xl mt-2"
              src={`/assets/post-images/${post.image}.webp`}
              fill sizes="100%"
              alt={post.title}
          /></div>

          <p className="text-sm sm:text-base md:text-lg text-slate-500">{post.description}</p>
        </div>

        <div
          className={`text-xs pt-2 text-slate-400 ${lng === "he" ? "text-left" : "text-right"
            }`}
        >
          {t("readPost")}
        </div>

      </div>
    </Link>
  );
};

export default PostCard;
