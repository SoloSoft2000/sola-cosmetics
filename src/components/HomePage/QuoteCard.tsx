"use client";

import clsx from "clsx";
import { useLocale } from "next-intl";
import { RefreshCcw } from "lucide-react";
import { Locale } from "../../i18n/config";
import { useAsync, useToggle } from "react-use";
import { useState } from "react";

type QuoteType = { name: string; text: string };

const fetchNewQuote = async (lng: Locale, prevQuote?: QuoteType): Promise<QuoteType> => {
  const response = await fetch(`/api/quote?lng=${lng}`);
  const newQuote = (await response.json()) as QuoteType;
  return newQuote.text !== prevQuote?.text ? newQuote : fetchNewQuote(lng, prevQuote);
};

const QuoteCard = () => {
  const [quote, setQuote] = useState<QuoteType>({name: 'Author', text: 'Quote Text'});
  const [isAnimate, toggleAnimate] = useToggle(false);
  const [isFirstMount, setNotFirstMount] = useState(true);

  const lng = useLocale() as Locale;
  const isHebrew = lng === "he";

  const { loading, error } = useAsync(async () => {
    const newQuote = await fetchNewQuote(lng);
    setQuote(newQuote);
  }, [lng]);

  const handleQuoteUpdate = async () => {
    if (isAnimate) return;
    setNotFirstMount(false);
    toggleAnimate(true);
    const newQuote = await fetchNewQuote(lng, quote);
    setTimeout(() => {
      setQuote(newQuote);
      toggleAnimate(false);
    }, 1200);
  };

  return (
    <div className="relative cursor-pointer" onClick={handleQuoteUpdate}>
      <div className="relative">
        <div
          className={clsx(
            "h-16 md:h-24 p-1 md:p-4 transition duration-500 ease-in-out",
            loading && "opacity-50 animate-pulse",
            !isFirstMount && (isAnimate ? "animateLeftQuote" : "animateRightQuote")
          )}
        >
          <blockquote className={clsx("text-sm md:text-xl italic text-primary flex", isHebrew ? "text-right" : "text-left")}>
            {error ? `Error: ${error.message}` : quote?.text}
          </blockquote>
        </div>
        <div
          className={clsx(
            "bottom-1 text-base px-4 font-semibold text-gray-600 md:absolute transition duration-500 ease-in-out",
            isHebrew ? "md:left-2" : "md:right-2",
            loading && "opacity-50 animate-pulse",
            !isFirstMount && (isAnimate ? "animateLeftQuote" : "animateRightQuote")
          )}
        >
          {quote?.name}
        </div>
        <div className={clsx("absolute bottom-2 md:top-4 text-primary animate-spin-slow w-6 h-6", isHebrew ? "left-4" : "right-4")}>
          <RefreshCcw />
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
