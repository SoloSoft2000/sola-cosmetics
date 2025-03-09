
import clsx from "clsx"
import Image, { StaticImageData } from "next/image"
import { caveat, rubik } from "@/components/fonts";

export const PolaroidCard = ({item, id, isHebrew = false}: {item: { src: StaticImageData, caption: string }, id: string, isHebrew?: boolean}) => {
  return (
    <div
      id={id}
            className={
              clsx(
                'absolute border-2 p-2 lg:p-4 shadow-xl bg-white', 
              )}
          >
            <div
              className={clsx(
                "block polaroid w-[220px] md:w-[230px] xl:w-[320px] h-[250px] md:h-[240px] xl:h-[340px]",
              )}
            >
              <Image
                src={item.src}
                loading="lazy"
                alt=""
              />
            </div>
            <div
              className={clsx("my-1 md:my-3 text-center content-center text-sm xl:text-2xl",
                 isHebrew ? `italic ${rubik.className}`: caveat.className,
                 )}
            >
              {item.caption}
            </div>
          </div>
  )
}
