"use client"

import Image from "next/image";
import UkrFlag from "@/images/flags/ukr.svg";
import RusFlag from "@/images/flags/rus.svg";
import HebFlag from "@/images/flags/heb.svg";
import EngFlag from "@/images/flags/eng.svg";
import clsx from "clsx";
import { useLocale } from "next-intl";
import { setUserLocale } from "@/i18n/locale";
import { Locale } from "@/i18n/config";

const langFlags = [{
  lng: "en",
  flag: EngFlag
}, {
  lng: "he",
  flag: HebFlag
}, {
  lng: "ua",
  flag: UkrFlag
}, {
  lng: "ru",
  flag: RusFlag
}]
  
export const LangSwitch = () => {
  const currentLng = useLocale();
  
  return (
    <div className="flex items-center justify-around">
      {
        langFlags.map(({lng, flag}) => {
          const isActive = lng === currentLng;
          return (
            <button key={lng}  className={clsx(isActive ? "opacity-50 cursor-default" : "hover:scale-125","relative mr-2 h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8")} onClick={() => setUserLocale(lng as Locale)}>
              <Image src={flag} alt={lng} fill/>
            </button>
        )})
      }
    </div>
  );
};

