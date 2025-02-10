"use client"

import { rubik } from "@/components/fonts";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from 'next-intl';
export const NavMenu = () => {
  const t = useTranslations('Navigation');
  const itemNames = t('MenuNames').split("|");
  const menuItems = ["", "/posts", "/contact"];
  const pathName = usePathname();

  return (
    <div className="flex items-center justify-center">
      <div className={
          clsx("flex list-none items-center justify-center")
        }>
        {menuItems.map((item, idx) => {
          const isActive = pathName === `${item}`;
          return (
            <div key={idx} className={rubik.className}>
              <Link href={`${item}`}>
                <div
                  className={clsx("inline-flex items-center justify-center rounded-xl sm:rounded-full px-1 sm:px-2 lg:px-4 py-1 sm:py-2  text-sm xl:text-base text-stone-700 font-medium  transition duration-500",
                    !isActive && "hover:shadow-stone-400 hover:shadow-lg hover:bg-primary hover:text-white",
                    isActive && "text-primary cursor-default underline",
                  )}>
                  {itemNames[idx]}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
