import { useTranslations } from "next-intl";
import { rubik } from "../fonts";

export const ContactForm = () => {
  const translatedData = useTranslations('Contact');
  return (
    <div className="w-80 md:w-60 lg:w-80 bg-white rounded-xl shadow-xl ring-1 ring-slate-900/5 mx-auto">
      <form>
        <h2 className={`text-2xl text-primary ${rubik.className} pt-4 pb-2 px-4 `}>{translatedData('title')}</h2>
        <dl className="flex flex-wrap divide-y divide-slate-200 border-b border-slate-200 text-sm lg:text-base">
          <div className="px-2 pb-4 w-full">
            <div className="w-full flex p-2 justify-between">
              <dt className="flex-none font-medium text-sm md:text-xs lg:text-base">{translatedData('name')}</dt>
              <input type="text" className="border-b-2 outline-none mx-2" placeholder={translatedData('namePlaceHolder')} />
            </div>
            <div className="w-full flex justify-between p-2">
              <dt className="flex-none  font-medium  text-sm md:text-xs lg:text-base ">{translatedData('phone')}</dt>
              <input type="phone" className="border-b-2 outline-none mx-2" placeholder={translatedData('phonePlaceHolder')} />
            </div>
            <div className="w-full flex justify-between p-2">
              <dt className="flex-none  font-medium  text-sm md:text-xs lg:text-base">{translatedData('email')}</dt>
              <input type="email" className="border-b-2 outline-none mx-2" placeholder={translatedData('emailPlaceHolder')} />
            </div>
            <div className="w-full flex justify-between p-2">
              <dt className="flex-none  font-medium  text-sm md:text-xs lg:text-base">{translatedData('message')}</dt>
              <textarea rows={4} className="border-b-2 outline-none " placeholder={translatedData('messagePlaceHolder')} />
            </div>
          </div>
        </dl>
        <div className="grid grid-cols-2 gap-x-4 sm:gap-x-6 lg:gap-x-4 xl:gap-x-6 p-4 sm:px-6 sm:py-5 lg:p-4 xl:px-6 xl:py-5">
          <div className="text-base font-medium rounded-lg bg-sky-500 text-white py-3 text-center cursor-pointer dark:highlight-white/20">{translatedData('send')}</div>
        </div>
      </form>
    </div>
  )
};