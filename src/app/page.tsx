import { Contact } from '@/components/Contact/Contact';
import PolaroidPhotos from '@/components/HomePage/PolaroidPhotos';
import QuoteCard from '@/components/HomePage/QuoteCard';
import { MyServices } from '@/components/MyServices/myservices';
import { PostList } from '@/components/Posts/PostList';
import clsx from 'clsx';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

export default function HomePage() {
  const translatedData = useTranslations('home');
  const isHebrew = useLocale() === 'he';

  return (
    <main>
      {/* Welcome section with Polaroid Cards */}
      <section className="border-b-2 border-primary/25">
        <div className="container mx-auto ">
          <div className="flex flex-col lg:flex-row items-center justify-between lg:pt-8 ">
            <div
              className={clsx(
                "text-stone-900 w-3/4 text-center my-4",
                isHebrew ? "lg:text-right" : "lg:text-left"
              )}
            >
              <h1 className="h1">
                {translatedData("subtitle")} <br />
                <span className="text-primary">{translatedData("title")}</span>
              </h1>
              <div className="flex flex-col">
                <p className={clsx("mt-10 mb-4 text-justify indent-6", isHebrew ? 'lg:pl-20' : 'lg:pr-20')}>
                  {translatedData("desc")}
                </p>
                <div className={clsx("flex justify-center lg:justify-end", isHebrew ? 'lg:ml-20' : 'lg:mr-20')} >
                  <Link className="text-center rounded-full p-4 bg-primary text-white hover:scale-105 transition-transform shadow-stone-400 shadow-lg" href="/contact">
                    {translatedData("contact")}
                  </Link>
                </div>
              </div>
            </div>

            <div className="lg:my-15 lg:px-5 px-2 my-8">
              <PolaroidPhotos />
            </div>
          </div>
        </div>
      </section>
      {/* Quotes section */}
      <section className="border-b-2 border-primary/25 bg-white">
        <div className="container mx-auto">
          <QuoteCard />
        </div>
      </section>
      {/* Post section */}
      <section className="flex border-b-2 border-primary/25">
        <div className="container mx-auto flex flex-col md:flex-row  justify-between md:gap-5">
          <div className="w-full md:w-2/3">
            <PostList isOnlyLast />
          </div>
          <div id="contact" className="w-full md:w-1/3 flex flex-col items-center my-2 py-10">
            <Contact isHome />
          </div>
        </div>
      </section>
      {/* My Services section*/}
      <section className="flex border-b-2 border-primary/25">
        <MyServices />
      </section>


    </main>
  )
}