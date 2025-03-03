"use client";
import clsx from "clsx";
// import { useTranslations } from 'next-intl';
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { ContactForm } from "./ContactForm";

export const Contact = ({ isHome = false }: { isHome?: boolean }) => {
  // const lng = useLocale() as Locale;
  // const isHebrew = lng === "he";
  // const t = useTranslations('Contact');

  const LazyMap = useMemo(() => dynamic(() => import("./MapOSM"), {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }), []);

  return (
    <div className={clsx(
        "container mt-8 mx-auto flex items-center justify-center text-center",
        isHome ? "flex-col" : "flex-row")}>
      <div className="mx-auto my-5 w-80 md:w-60 lg:w-80 h-72">
        <LazyMap posix={[32.991590, 35.684066]} zoom={17} />
      </div>
      <ContactForm />
    </div>
  );
}
