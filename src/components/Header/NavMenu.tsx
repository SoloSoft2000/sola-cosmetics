"use client"

import { rubik } from "@/components/fonts";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from 'next-intl';
import { MenuItem } from "./MenuItem";
export const NavMenu = () => {
  const t = useTranslations('Navigation');
  const itemNames = t('MenuNames').split("|");
  const menuItems = ["/", "/posts", "#contact"];
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
                <MenuItem menuName={itemNames[idx]} isActive={isActive} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
