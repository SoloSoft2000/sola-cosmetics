"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { useLocale } from "next-intl";

type Quote = { name: string; text: string };

const fetchNewQuote = async (prevQuote: Quote | null) => {
  const response = await fetch(`/api/quote`);
  const newQuote = await response.json() as Quote;
  if (newQuote === prevQuote) return fetchNewQuote(prevQuote);
  return newQuote;
};

const QuoteCard = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isAnimateChangeQuote, setAnimateChangeQuote] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const loadFirstQuote = async () => {
      const firstQuote = await fetchNewQuote(null);
      setQuote(firstQuote);
    };
    loadFirstQuote();
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const loadNewQuote = async () => {
      const newQuote = await fetchNewQuote(quote);
      setQuote(newQuote);
    };
    const intervalId = setInterval(() => {
      setAnimateChangeQuote(true);
      setTimeout(() => {
        loadNewQuote();
        setAnimateChangeQuote(false);
      }, 1200);
    }, 8000);
    return () => clearInterval(intervalId);
    
  }, [quote, isHovered]);

  const handleQuoteUpdate = async () => {
    if (isAnimateChangeQuote) return;
    setAnimateChangeQuote(true);
    const newQuote = await fetchNewQuote(quote);
    setTimeout(() => {
      setQuote(newQuote);
      setAnimateChangeQuote(false);
    }, 1200);
  };

  const isHebrew = useLocale() === 'he';

  return (
    <div
      className="relative cursor-pointer"
      onClick={handleQuoteUpdate}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div>
        <div
          className={clsx(
            "h-16 md:h-24 p-1 md:p-4 transition duration-500 ease-in-out",
            isAnimateChangeQuote ? "animateLeftQuote" : "animateRightQuote"
          )}
        >
          <blockquote
            className={clsx(
              "text-sm md:text-xl italic text-[#e7687f]",
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
            isAnimateChangeQuote ? "animateLeftQuote" : "animateRightQuote"
          )}
        >
          {quote?.name || '...'}
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
