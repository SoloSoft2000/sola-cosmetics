import Image from "next/image";
import logoImg from "@/images/logo.svg";
import { brush } from "@/components/fonts";

export const Logo = () => {
  return (
    <div className="flex flex-row" dir="ltr">
      <div className="w-12 md:w-16 lg:w-24">
        <Image
          src={logoImg}
          alt="SolA-Cosmetic logo"
          style={{
            objectFit: "contain",
            height: 'auto',
            width: 'auto'
          }}
        />
      </div>
      <div className="pl-1 sm:pl-2 my-auto">
        <h1 className={`${brush.className} text-xs lg:text-base`}>SolA-Cosmetic</h1>
        <p className={`${brush.className} text-xs lg:text-base`}>052 541-2604</p>
      </div>
    </div>
  )
}
