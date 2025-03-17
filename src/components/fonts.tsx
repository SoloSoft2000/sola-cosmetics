import { Philosopher, Heebo } from "next/font/google";
import { Caveat_Brush, Caveat } from 'next/font/google';

export const brush = Caveat_Brush({
  subsets: ["latin", "latin-ext"],
  weight: "400"
})

export const caveat = Caveat({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  weight: ["400", "700"]
})

export const heebo = Heebo({
  style: "normal",
  subsets: ["hebrew"],
  weight: ["400", "700"],
  preload: true
});

export const philosopher = Philosopher({
  style: ["italic", "normal"],
  subsets: ["cyrillic", "cyrillic-ext", "latin-ext", "latin"],
  weight: ["400", "700"],
  preload: true
})

