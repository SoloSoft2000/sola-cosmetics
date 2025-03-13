import { useTranslations } from "next-intl";
import { rubik } from "../fonts";
import Link from "next/link";
import { IoLogoFacebook, IoLogoWhatsapp, IoMail } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import Form from 'next/form';
import  { sendEmail }  from "./actions";

const style = { filter: "drop-shadow(2px 3px 4px gray)"};

export const ContactForm = () => {
  const translatedData = useTranslations('Contact');
  return (
    <div className="w-80 md:w-60 lg:w-80 bg-white rounded-xl shadow-xl ring-1 ring-slate-900/5 mx-auto">
      <Form action={sendEmail}>
        <h2 className={`text-2xl text-primary ${rubik.className} pt-4 pb-2 px-4 `}>{translatedData('title')}</h2>
        <dl className="flex flex-wrap divide-y divide-slate-200 border-b border-slate-200 text-sm lg:text-base">
          <div className="px-2 pb-4 w-full">
            <div className="w-full flex p-2 justify-between">
              <dt className="flex-none font-medium text-sm md:text-xs lg:text-base">{translatedData('name')}</dt>
              <input name="name" type="text" className="border-b-2 outline-none mx-2" placeholder={translatedData('namePlaceHolder')} />
            </div>
            <div className="w-full flex justify-between p-2">
              <dt className="flex-none  font-medium  text-sm md:text-xs lg:text-base ">{translatedData('phone')}</dt>
              <input name="phone" type="phone" className="border-b-2 outline-none mx-2" placeholder={translatedData('phonePlaceHolder')} />
            </div>
            <div className="w-full flex justify-between p-2">
              <dt className="flex-none  font-medium  text-sm md:text-xs lg:text-base">{translatedData('message')}</dt>
              <textarea name="message" rows={4} className="border-b-2 outline-none " placeholder={translatedData('messagePlaceHolder')} />
            </div>
          </div>
        </dl>
        <div className="grid grid-cols-1 gap-x-4 sm:gap-x-6 lg:gap-x-4 xl:gap-x-6 p-4 sm:px-6 sm:py-5 lg:p-4 xl:px-6 xl:py-5 border-b">
          <button type="submit" className="text-center rounded-full p-2 bg-primary text-base text-white hover:scale-105 transition-transform shadow-stone-400 shadow-lg">{translatedData('send')}</button>
        </div>
        <dl className="flex justify-around p-4">
          <Link href={`tel:${process.env.NEXT_PUBLIC_PHONE || "123456789"}`}>
            <FaPhone className="w-6 h-6 hover:scale-110 duration-300" style={style} color="#e7687f" />
          </Link>
          <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_PHONE || "123456789"}`}>
            <IoLogoWhatsapp  className="w-6 h-6 hover:scale-110 duration-300" style={style} color="#25D366" />
          </Link>
          <Link href={process.env.NEXT_PUBLIC_FBLINK || "https://www.facebook.com"}>
            <IoLogoFacebook className="w-6 h-6 hover:scale-110 duration-300" style={style} color="#1877F2" />
          </Link>
          <Link href={`mailto:${process.env.NEXT_PUBLIC_EMAIL || "email@example.com"}`}>
            <IoMail className="w-6 h-6 hover:scale-110 duration-300" style={style} color="#D14836" />
          </Link>
        </dl>
      </Form>
    </div>
  )
};