import Image, { StaticImageData } from "next/image"
import { ServiceItemType } from "./myservices"
import {
  antiAgeImage, bodyFaceImage, cleanFaceImage,
  diagnoseImage, lighteningImage, massageImage, problemsImage
} from "@/images/services/import";

const images: { [key: string]: StaticImageData } = {
  antiAge: antiAgeImage,
  bodyFace: bodyFaceImage,
  cleanFace: cleanFaceImage,
  diagnose: diagnoseImage,
  lightening: lighteningImage,
  massage: massageImage,
  problems: problemsImage
}
export default function ServiceItem({ item }: { item: ServiceItemType }) {

  return (
    <div className="md:rounded-e-[16px] ">
      <div className="flex mx-6 my-4 p-4 border-2 rounded-2xl bg-white shadow-xl shadow-primary/25">
        <div className="hidden md:block">
          <Image src={images[item.image]} alt="" width={160} height={240} className="rounded-2xl float-left  py-auto h-60 w-auto" />
        </div>

        <div className="text-sm md:text-base xl:text-lg text-justify indent-2 px-1 md:px-6 w-full md:w-4/5 text-black">
          <Image src={images[item.image]} alt="" width={64} height={96} className="rounded-xl float-left mr-2 mt-2 md:hidden py-auto h-24 w-auto" />
          <h3 className="hidden md:block lg:text-2xl xl:text-3xl text-primary text-center font-semibold pt-4">
            {item.title}
          </h3>
          <p className="text-sm md:text-base xl:text-lg indent-2">{item.description}</p>
        </div>
      </div>

    </div>
  )
}
