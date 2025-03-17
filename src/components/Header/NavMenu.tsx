"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from 'next-intl';
import { MenuItem } from "./MenuItem";
export const NavMenu = () => {
  const t = useTranslations('Navigation');
  const itemNames = t('MenuNames').split("|");
  const menuItems = [
    { href: "/", name: itemNames[0] },
    { href: "/posts", name: itemNames[1] },
    { href: "/#contact", name: itemNames[2] },
  ];
  const pathName = usePathname();

  return (
    <nav className="flex items-center justify-center" aria-label="Main navigation">
      <ul className="flex list-none items-center justify-center">
        {menuItems.map((menuItem, idx) => {
          const isActive = pathName === menuItem.href;
          return (
            <li key={idx}>
              <Link href={menuItem.href}>
                <MenuItem
                  menuName={menuItem.name}
                  isActive={isActive}
                  aria-current={isActive ? "page" : undefined}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
