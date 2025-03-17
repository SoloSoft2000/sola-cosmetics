import Image from 'next/image';
import "./Album.css";
import { Suspense } from 'react';
import clsx from 'clsx';
import { getLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';

export const Album = async () => {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "http://localhost:3000";
  
  const imagesJson = await fetch(`${baseUrl}/api/album`, {
    cache: "no-store",
  });

  const images = (await imagesJson.json()) as string[];
  
  if (!images) {
    return (
      <div />
    )
  }

  const lng = (await getLocale()) as Locale;
  const isHebrew = lng === "he";

  const imageList = images.map((image, index) => (
    <div key={index} className="item relative w-40 h-48 md:w-52 md:h-60">
      <Suspense fallback={<div className="w-4/5 h-full bg-gray-300 animate-pulse"></div>}>
        <Image
          src={image}
          alt={image.replace(baseUrl + "/public/assets/album/", "").replace(".webp", "")}
          style={{objectFit: "scale-down"}}
          fill
          sizes="100%"
          loading="lazy"
          className="image"
        />
      </Suspense>
    </div>
  ));

  return (
    <>          
      <div className="container mx-auto my-auto h-52 md:h-64 py-2 flex overflow-hidden items-wrap gap-2" dir='ltr'>
        <div className={clsx("flex flex-row items", isHebrew ? "marquee-right" : "marquee")}>
          {imageList}
        </div>
        <div aria-hidden="true" className={clsx("flex flex-row items", isHebrew ? "marquee-right" : "marquee")}>
          {imageList}
        </div>
      </div>
    </>
  )    
}
