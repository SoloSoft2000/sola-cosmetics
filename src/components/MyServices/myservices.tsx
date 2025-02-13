"use client"

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import ServiceItem from "./ServiceItem";

export type ServiceItemType = {
  image: string;
  title: string;
  description: string
}

const getTabStyles = (idx: number, active: number, length: number) => {
  const isActive = active === idx;
  let result = 'p-2 text-center lg:text-end md:py-12 lg:py-4 text-xl md:text-base lg:text-xl xl:text-lg ';
  if (isActive) {
    result += 'bg-transparent text-[#e7687f] ';
    result += idx === 0 ? 'md:rounded-ss-2xl ' : idx === length - 1 ? 'md:rounded-es-2xl border-b-0 ' : 'md:rounded-s-2xl ';
  } else {
    result += 'bg-white ';
    if (idx === active - 1)
      result += 'md:rounded-ee-2xl '
    if (idx === active + 1)
      result += 'md:rounded-es-2xl lg:rounded-es-[0px] lg:rounded-se-2xl '
  }
  return result;
}

export const MyServices = () => {
  const [servicesList, setList] = useState([] as ServiceItemType[]);
  const [activeService, setActiveService] = useState(0);

  const translatedData = useTranslations('MyServices');
  const lng = useLocale();
  // const isHebrew = lng === 'he';

  const handleServiceClick = (idx: number) => {
    setActiveService(idx);
  };

  useEffect(() => {
    const fetchServices = async () => {
      const servicesData = await fetch(`/api/services?lng=${lng}`);
      const services: ServiceItemType[] = await servicesData.json();
      setList(services);
    }
    fetchServices();
  }, [lng])

  if (!servicesList.length)
    return (
      <div className="container flex flex-col justify-between my-4">
        <div className="border-8 border-white bg-transparent/5 rounded-3xl mx-auto shadow-2xl">
          <h2 className="mx-auto text-base sm:text-xl lg:text-2xl text-center py-4 sm:py-6 h2 border-b-4 border-white">{translatedData("title")}</h2>
          <h5> loading ... </h5>
        </div>
      </div>
    )

  return (
    <div className="container flex flex-col justify-between my-4 mx-auto">
      <div className="border-8 border-white bg-transparent/5 rounded-3xl mx-auto shadow-2xl">
        <h2 className="mx-auto text-base sm:text-xl lg:text-2xl text-center py-4 sm:py-6 h2 border-b-4 border-white">{translatedData("title")}</h2>
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col md:flex-row lg:flex-col md:w-full lg:w-1/3 divide-y divide-slate-200">
            {servicesList.map((serviceItem, idx) => (
              <button
                key={serviceItem.title}
                onClick={() => handleServiceClick(idx)}
                onMouseEnter={() => handleServiceClick(idx)}
                className={getTabStyles(idx, activeService, servicesList.length)}
              >
                <div className="rotate-0 text-sm lg:text-base md:-rotate-[65deg] md:leading-3 lg:rotate-0">{serviceItem.title}</div>
                {idx === activeService && <div className="block md:hidden">
                  <ServiceItem item={serviceItem} />
                </div>}
              </button>
            ))}
          </div>
          <div className="hidden md:block w-full rounded-e-3xl">
            <ServiceItem item={servicesList[activeService]} />
          </div>
        </div>
      </div>
    </div>
  )
}