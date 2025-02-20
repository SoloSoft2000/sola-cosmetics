'use client'

import polaroidPhoto1 from "@/images/polaroids/polaroid1.jpg";
import polaroidPhoto2 from "@/images/polaroids/polaroid2.jpg";
import polaroidPhoto3 from "@/images/polaroids/polaroid3.jpg";
import './Polaroid.css';
import { PolaroidCard } from "./PolaroidCard";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import clsx from "clsx";

const PolaroidPhotos = () => {
  const isHebrew = useLocale() === 'he';
  const translatedData = useTranslations('PolaroidTitles');

  const photos = [
    { src: polaroidPhoto1, caption: translatedData('photo1') },
    { src: polaroidPhoto2, caption: translatedData('photo2') },
    { src: polaroidPhoto3, caption: translatedData('photo3') },
  ];

  const [currIndex, setCurrIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const intervalId = setInterval(() => {
      if (isAnimating) return;
      setIsAnimating(true);
      setTimeout(() => {
        setCurrIndex((prev) => (prev + 1) % photos.length);
        setIsAnimating(false);
      }, 1500);
    }, 2500)
    return () => clearInterval(intervalId);
  }, [currIndex, isAnimating, photos.length, isHovered])

  const handleClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrIndex((prev) => (prev + 1) % photos.length);
      setIsAnimating(false);
    }, 2500);
  };

  return (
    <div
      id="polaroid-wrapper"
      className={clsx(
        "relative w-[240px] h-[280px] md:w-[250px] md:h-[320px] xl:w-[350px] xl:h-[450px] mx-auto mb-8",
        `activePolaroidCard${currIndex}`,
        isAnimating ? `animateCard${currIndex}` : ""
      )}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      {photos.map((item, idx) => (
        <PolaroidCard
          key={idx}
          item={item}
          id={`polaroid${idx}`}
          isHebrew = {isHebrew}
        />
      ))}
    </div>
  );
};

export default PolaroidPhotos;
