import React, { useState } from 'react';

import { photoType } from '@/types/hotel';

import { SvgSprite } from '../ui/svg-sprite';
interface HotelComponentPhotoSliderProps {
  photos: photoType[];
}

export function HotelComponentPhotoSlider({
  photos,
}: HotelComponentPhotoSliderProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + photos.length) % photos.length,
    );
  };

  if (!photos || photos.length === 0) {
    return (
      <div className='mb-4 w-full md:mb-0 md:mr-4 md:w-2/5'>Нет фотографий</div>
    );
  }

  return (
    <>
      <div
        className='relative flex h-full w-full transition-transform duration-1000 ease-in-out'
        style={{
          transform: `translateX(-${currentImageIndex * 100}%)`,
          transition: 'transform 1s ease-in-out',
        }}
      >
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo?.photo || '/placeholder-image.png'}
            alt={`Фото отеля${index}`}
            className='h-full w-full flex-shrink-0 rounded-l-lg object-cover'
          />
        ))}
      </div>

      {/* Стрелочка слева */}
      <button
        onClick={prevImage}
        className='absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 transform rounded-full bg-white p-2 opacity-60 transition-transform duration-300 ease-in-out md:left-[18px] md:flex'
      >
        <SvgSprite
          name='arrow'
          width={24}
          height={24}
          className='rotate-180 transform'
          color='blue'
        />
      </button>

      {/* Стрелочка справа */}
      <button
        onClick={nextImage}
        className='absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 transform rounded-full bg-white p-2 opacity-60 transition-transform duration-300 ease-in-out md:right-[52px] md:flex lg:right-[68px]'
      >
        <SvgSprite name='arrow' width={24} height={24} color='blue' />
      </button>
    </>
  );
}
