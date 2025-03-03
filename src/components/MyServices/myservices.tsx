"use client"

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import ServiceItem from "./ServiceItem";
import useAsync, { AsyncState } from "react-use/lib/useAsync";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";

export type ServiceItemType = {
  image: string;
  title: string;
  description: string
}

export const MyServices = () => {
  const [activeService, setActiveService] = useState(0);
  const translatedData = useTranslations('MyServices');
  const lng = useLocale();

  const { value: servicesList = [], loading, error }: AsyncState<ServiceItemType[]> = useAsync(async () => {
      const res = await fetch(`/api/services?lng=${lng}`);
      if (!res.ok) throw new Error("Failed to fetch services");
      return res.json();
  }, [lng]);

  const getTabStyles = (idx: number) => {
    const isActive = activeService === idx;
    const isFirst = idx === 0;
    const isLast = servicesList.length - 1;
    return clsx(
      'p-2 text-center lg:text-end md:py-12 lg:py-4 text-xl md:text-base lg:text-xl xl:text-lg duration-500',
      isActive ? 'bg-transparent text-primary font-semibold z-10' : 'bg-white',
      isActive && isFirst && 'md:rounded-ss-2xl',
      isActive && isLast && 'md:rounded-es-2xl border-b-0',
      isActive && !isFirst && !isLast && 'md:rounded-s-2xl',
      !isActive && idx === activeService - 1 && 'md:rounded-ee-2xl',
      !isActive && idx === activeService + 1 && 'md:rounded-es-2xl lg:rounded-es-[0px] lg:rounded-se-2xl',
    )
  };

  if (loading || error)
    return (
      <div className="container flex flex-col justify-between my-4">
        <div className="border-8 border-white bg-transparent/5 rounded-3xl mx-auto shadow-2xl">
          <h2 className="mx-auto text-base sm:text-xl lg:text-2xl text-center py-4 sm:py-6 h2 border-b-4 border-white">{translatedData("title")}</h2>
          <h5> {error ? `Error: ${error.message}` : "Loading..."} </h5>
        </div>
      </div>
    )
  
  return (
    <div className="container flex flex-col justify-between my-4 mx-auto">
      <div className="border-8 border-white bg-transparent/5 rounded-3xl mx-2 shadow-2xl">
        <h2 className="mx-auto text-base sm:text-xl lg:text-2xl text-center py-4 sm:py-6 h2 border-b-4 border-white">{translatedData("title")}</h2>
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col md:flex-row lg:flex-col md:w-full lg:w-1/3 divide-y divide-slate-200">
            {servicesList.map((serviceItem, idx) => (
              <button
                key={serviceItem.title}
                onClick={() => setActiveService(idx)}
                // onMouseEnter={() => setActiveService(idx)}
                className={getTabStyles(idx)}
              >
                <div className="rotate-0 text-sm lg:text-base md:-rotate-[65deg] md:leading-3 lg:rotate-0">{serviceItem.title}</div>
                <AnimatePresence mode="wait">
                {idx === activeService && <motion.div
                  key={serviceItem.title}
                  initial={{ scale: 0.2,  height: 0, opacity: 0 }}
                  animate={{ scale: 1, height: "auto", opacity: 1 }}
                  exit={{ scale: 0.2, height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="block md:hidden">
                  <ServiceItem item={serviceItem} />
                </motion.div>}
                </AnimatePresence>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div 
             key={servicesList[activeService].title}
             initial={{ opacity: 0, x: 5 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: 5 }}
             transition={{ duration: 0.3 }}
             className="hidden md:block w-full rounded-e-3xl my-auto">
              <ServiceItem item={servicesList[activeService]} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}