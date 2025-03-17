'use client'

import polaroidPhoto1 from "@/images/polaroids/polaroid1.webp";
import polaroidPhoto2 from "@/images/polaroids/polaroid2.webp";
import polaroidPhoto3 from "@/images/polaroids/polaroid3.webp";
import './Polaroid.css';
import { PolaroidCard } from "./PolaroidCard";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import clsx from "clsx";
import { useInterval } from "react-use";

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

  useInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrIndex((prev) => (prev + 1) % photos.length);
        setIsAnimating(false);
      }, 1500);
    }, isHovered || isAnimating ? null : 2500)
  
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
        "relative w-[240px] h-[280px] md:w-[250px] md:h-[320px] xl:w-[350px] xl:h-[450px] mx-auto mb-8 ",
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
          aria-label={`Polaroid photo ${idx + 1}: ${item.caption}`}
        />
      ))}
    </div>
  );
};

export default PolaroidPhotos;
