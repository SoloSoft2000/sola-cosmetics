"use client"

import clsx from 'clsx';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { rubik } from "@/components/fonts";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from 'next-intl';
import { MenuItem } from './MenuItem';
export const BurgerMenu = () => {
  const [isOpen, setOpen] = useState(false);

  const toggleMenu = () => {
    const newStatus = !isOpen;
    setOpen(newStatus);
  }

  const t = useTranslations('Navigation');
  const itemNames = t('MenuNames').split("|");
  const menuItems = ["/", "/posts", "#contact"];
  const pathName = usePathname();
  const isHebrew = useLocale() === 'he';
  
  return (
    <>
    { isOpen && <div className='absolute top-0 left-0 w-screen h-screen bg-slate-800 opacity-50' onClick={toggleMenu}></div>}
    <div className='px-4 flex flex-col relative'>
      <Menu  className={clsx('cursor-pointer transition duration-500', isOpen ? 'rotate-90' : '')} onClick={toggleMenu} />
      { isOpen && <div className={clsx('absolute top-10 bg-white p-4 text-center rounded-md shadow-lg shadow-slate-600',
        isHebrew ? "left-4" : "right-4"
      )}>
        {menuItems.map((item, idx) => {
          const isActive = pathName === `${item}`;
          return (
            <div key={idx} className={rubik.className}>
              <Link href={`${item}`} onClick={toggleMenu}>
                <MenuItem menuName={itemNames[idx]} isActive={isActive} />
              </Link>
            </div>
          );
        })}
        </div>
      }
    </div>
    </>
  );
};
