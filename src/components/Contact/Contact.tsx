"use client";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { ContactForm } from "./ContactForm";
import Link from "next/link";
import { FaWaze } from "react-icons/fa6";
import { SiGooglemaps } from "react-icons/si";

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
      {!isPost && <div className="mx-auto w-80 md:w-60 lg:w-80 h-60">
        <LazyMap posix={[32.991590, 35.684066]} zoom={17} />
      </div>
      }
      <div className="w-80 md:w-60 lg:w-80 bg-white rounded-xl shadow-xl ring-1 ring-slate-900/5 p-4 mx-auto mt-1 mb-8 flex justify-around">
        <Link href={process.env.NEXT_PUBLIC_WAZE_LINK || "https://waze.com/"} className="flex text-xl">
          Waze: 
          <FaWaze size={32} style={{ paddingLeft: "5px", filter: "drop-shadow(2px 3px 4px gray)", color: "#4285F4"}}/>
        </Link>
        
        <Link href={process.env.NEXT_PUBLIC_GMAPS_LINK || "https://maps.google.com/"} className="flex text-xl">
          Google Maps: 
          <SiGooglemaps size={28} style={{ paddingLeft: "5px", filter: "drop-shadow(2px 3px 4px gray)", color: "#2a9d8f"}}/>
        </Link>
                
      </div>
      <ContactForm />
    </div>
  );
}
