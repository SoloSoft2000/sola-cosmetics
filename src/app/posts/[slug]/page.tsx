import { getLocale, getTranslations } from "next-intl/server";
import { SubContent } from "./SubContent";
import { redirect } from "next/navigation";
import { Locale } from "@/i18n/config";
import Link from "next/link";
import clsx from "clsx";
import { ShareButtons } from "./ShareButtons";

type Article = {
  title: string;
  content: string;
};

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const lng = (await getLocale()) as Locale;
  const translatedData = await getTranslations("posts");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const postData = await fetch(
    `${baseUrl}/api/post?lng=${lng}&filename=${slug}`,
    { cache: "force-cache" }
  );

  if (postData.status !== 200) {
    redirect("/posts");
  }

  const post = await postData.json();

  const articles: Article[] = post.articles.map((part: Article) => {
    return {
      title: part.title,
      content: part.content,
    };
  });

  return (
    <div className="border-b-2 pb-4 border-[#e7687f]/25 min-h-screen">
      <div className="container w-full mx-auto">
        <h1 className="text-lg lg:text-2xl xl:text-3xl text-center font-bold p-2 lg:p-5 xl:p-8 text-primary">
          {post.title}
        </h1>
        <div className="grid grid-cols-4">
          <div className="w-full mx-auto col-span-3">
            {articles.map((part, idx) => (
              <div className="p-2" key={idx} id={`article${idx}`}>
                <h2
                  className={clsx(
                    "text-base lg:text-xl font-semibold",
                    idx && "p-4"
                  )}
                >
                  {part.title}
                </h2>
                {Array.isArray(part.content) && (
                  <SubContent content={part.content} />
                )}
                {!Array.isArray(part.content) && (
                  <p className="text-base lg:text-lg text-justify">
                    {part.content}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div>
            <div className="py-4 px-1 bg-white rounded-xl shadow-xl w-3/4 float-end">
              <h3 className="text-center text-primary">
                {translatedData("contents")}
              </h3>
              <ul className="p-2">
                {articles.map((part, idx) => (
                  <li
                    key={idx}
                    className=" m-1 rounded-xl sm:rounded-full px-1 sm:px-2 lg:px-4 py-1 sm:py-2 text-sm xl:text-base  font-medium  transition duration-300 hover:shadow-stone-400 hover:shadow-lg hover:bg-primary hover:text-white text-stone-700"
                  >
                    <Link
                      className="text-xs lg:text-sm"
                      href={`#article${idx}`}
                    >
                      {part.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 py-4 px-1 bg-white rounded-xl shadow-xl w-3/4 float-end">
              <h3 className="text-center text-primary">
                {translatedData("like")}<br />
                <span className="text-base text-black">{translatedData("share")}</span>
              </h3>
              <div className="flex justify-around mx-auto my-3">
                <ShareButtons />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
