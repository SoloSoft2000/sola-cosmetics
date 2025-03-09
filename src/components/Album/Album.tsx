"use client"

import Image from 'next/image';
import "./Album.css";
import { useEffect, useState } from 'react';

export const Album = () => {
  const [images, setImages] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch('/api/album');
      const data = await response.json();
      setImages(data);
    }

    fetchImages();
  }, []);
  
  
  if (!images) {
    return (
      <div />
    )
  }

  const imageList = images.map((image, index) => (
    <div key={index} className="item relative w-40 h-48 md:w-52 md:h-60">           
      <Image src={image} alt="" style={{objectFit: "scale-down"}} fill sizes="100%" loading="eager" />
    </div>
  ));

  return (
    <>          
      <div className="mx-auto my-auto h-52 md:h-64 py-2 flex overflow-hidden items-wrap gap-2" dir='ltr'>
        <div className="flex flex-row items marquee">
          {imageList}
        </div>
        <div aria-hidden="true" className="flex flex-row items marquee">
          {imageList}
        </div>
      </div>
    </>
  )    
}
