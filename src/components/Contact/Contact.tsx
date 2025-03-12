"use client";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { ContactForm } from "./ContactForm";

type ContactProps = {
  isHome?: boolean;
  isPost?: boolean;
}
export const Contact = ({ isHome, isPost }: ContactProps) => {

  const LazyMap = useMemo(() => dynamic(() => import("./MapOSM"), {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }), []);

  return (
    <div className={clsx(
      "container mx-auto flex items-center justify-center text-center",
      !isPost && "mt-8",
      (isHome || isPost) ? "flex-col" : "flex-row")}>
      {!isPost && <div className="mx-auto my-5 w-80 md:w-60 lg:w-80 h-72">
        <LazyMap posix={[32.991590, 35.684066]} zoom={17} />
      </div>
      }
      <ContactForm />
    </div>
  );
}
