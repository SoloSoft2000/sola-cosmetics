"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { useLocale } from "next-intl";
import { RefreshCcw } from 'lucide-react';
import { Locale } from '../../i18n/config';

type Quote = { name: string; text: string };

const fetchNewQuote = async (lng: Locale, prevQuote: Quote | null) => {
  const response = await fetch(`/api/quote?lng=${lng}`);
  const newQuote = await response.json() as Quote;
  if (newQuote === prevQuote) return fetchNewQuote(lng, prevQuote);
  return newQuote;
};

const QuoteCard = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isAnimateChangeQuote, setAnimateChangeQuote] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const lng = useLocale() as Locale;
  const isHebrew =  lng === 'he';

  useEffect(() => {
    const loadFirstQuote = async () => {
      const firstQuote = await fetchNewQuote(lng, null);
      setQuote(firstQuote);
    };
    loadFirstQuote();
  }, [lng]);

  const handleQuoteUpdate = async () => {
    if (isAnimateChangeQuote) return;
    setIsFirstLoad(false);
    setAnimateChangeQuote(true);
    const newQuote = await fetchNewQuote(lng, quote);
    setTimeout(() => {
      setQuote(newQuote);
      setAnimateChangeQuote(false);
    }, 1200);
  };

  return (
    <div
      className="relative cursor-pointer"
      onClick={handleQuoteUpdate}
    >
      <div className="relative">
        <div
          className={clsx(
            "h-16 md:h-24 p-1 md:p-4 transition duration-500 ease-in-out",
            !isFirstLoad ? isAnimateChangeQuote ? "animateLeftQuote" : "animateRightQuote" : ''
          )}
        > 
          <blockquote
            className={clsx(
              "text-sm md:text-xl italic text-primary flex",
              isHebrew && "text-right",
              !isHebrew && "text-left"
            )}
          >
            
            {quote?.text ? `"${quote.text}"` : '...'}
            
          </blockquote>
        </div>
        <div
          className={clsx(
            "bottom-1 text-base px-4 font-semibold text-gray-600 md:absolute transition duration-500 ease-in-out",
            isHebrew && "md:left-2",
            !isHebrew && "md:right-2",
            !isFirstLoad ? isAnimateChangeQuote ? "animateLeftQuote" : "animateRightQuote" : ''
          )}
        >
          {quote?.name || '...'}
        </div>
        <div className={clsx("absolute bottom-2 md:top-4 text-primary animate-spin-slow w-6 h-6", isHebrew ? 'left-4' : 'right-4')}><RefreshCcw /></div>
      </div>
    </div>
  );
};

export default QuoteCard;
