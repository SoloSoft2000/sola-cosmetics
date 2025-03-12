"use client";

import { usePathname } from "next/navigation";
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, ViberIcon, ViberShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";

const style = { filter: "drop-shadow(2px 3px 4px gray)"};
const cls = "hover:scale-105 duration-300 h-6 w-6 xl:h-8 xl:w-8";
const baseUrl = process.env.DOMAINNAME || 'http://localhost:3000';

export const ShareButtons = () => {
  const url = usePathname();
  const shareUrl = `${baseUrl}${url}`
  return (
    <>

      <WhatsappShareButton url={shareUrl}>
        <WhatsappIcon round style={style} className={cls} />
      </WhatsappShareButton>

      <TelegramShareButton url={shareUrl}>
        <TelegramIcon round style={style} className={cls} />
      </TelegramShareButton>

      <ViberShareButton url={shareUrl}>
        <ViberIcon round style={style} className={cls} />
      </ViberShareButton>

      <TwitterShareButton url={shareUrl}>
        <TwitterIcon round style={style} className={cls} />
      </TwitterShareButton>

      <EmailShareButton url={shareUrl}>
        <EmailIcon round style={style} className={cls} />
      </EmailShareButton>

      <FacebookShareButton url={shareUrl}>
        <FacebookIcon round style={style} className={cls} />
      </FacebookShareButton>
    </>
  );
};
