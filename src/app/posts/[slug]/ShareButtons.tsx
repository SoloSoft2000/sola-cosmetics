"use client";

import { usePathname } from "next/navigation";
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, ViberIcon, ViberShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";

const style = { filter: "drop-shadow(2px 3px 4px gray)"};
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const ShareButtons = () => {
  const url = usePathname();
  const shareUrl = `${baseUrl}${url}`
  return (
    <>

      <WhatsappShareButton url={shareUrl}>
        <WhatsappIcon round style={style} className="hover:scale-105 duration-300 h-4 w-4 lg:h-6 lg:w-6 xl:h-8 xl:w-8" />
      </WhatsappShareButton>

      <TelegramShareButton url={shareUrl}>
        <TelegramIcon round style={style} className="hover:scale-105 duration-300 h-4 w-4 lg:h-6 lg:w-6 xl:h-8 xl:w-8" />
      </TelegramShareButton>

      <ViberShareButton url={shareUrl}>
        <ViberIcon round style={style} className="hover:scale-105 duration-300 h-4 w-4 lg:h-6 lg:w-6 xl:h-8 xl:w-8" />
      </ViberShareButton>

      <TwitterShareButton url={shareUrl}>
        <TwitterIcon round style={style} className="hover:scale-105 duration-300 h-4 w-4 lg:h-6 lg:w-6 xl:h-8 xl:w-8" />
      </TwitterShareButton>

      <EmailShareButton url={shareUrl}>
        <EmailIcon round style={style} className="hover:scale-105 duration-300 h-4 w-4 lg:h-6 lg:w-6 xl:h-8 xl:w-8" />
      </EmailShareButton>

      <FacebookShareButton url={shareUrl}>
        <FacebookIcon round style={style} className="hover:scale-105 duration-300 h-4 w-4 lg:h-6 lg:w-6 xl:h-8 xl:w-8"/>
      </FacebookShareButton>
    </>
  );
};
