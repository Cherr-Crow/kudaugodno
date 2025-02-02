import React, { useState } from 'react';

import { Hotel } from '@/types/hotel';

import { SvgSprite } from '../svg-sprite';


interface HotelComponentPhotoSliderProps {
  hotel: Hotel;
}

export function HotelComponentPhotoSlider({ hotel }: HotelComponentPhotoSliderProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % hotel.photos.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + hotel.photos.length) % hotel.photos.length
    );
  };

  if (!hotel.photos || hotel.photos.length === 0) {
    return <div className="w-full md:w-2/5 mb-4 md:mb-0 md:mr-4">Нет фотографий</div>;
  }

  return (
    <>
      <div
        className="relative w-full h-full flex transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${currentImageIndex * 100}%)`,
          transition: 'transform 1s ease-in-out',
        }}
      >
        {hotel.photos.map((photo, index) => (
          <img
            key={index}
            src={photo?.photo || '/placeholder-image.png'}
            alt={hotel.name}
            className="w-full h-full object-cover rounded-l-lg"
          />
        ))}
      </div>

      {/* Стрелочка слева */}
      <button
        onClick={prevImage}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 bg-white opacity-60 p-2 rounded-full transition-transform duration-300 ease-in-out"
      >
        <SvgSprite name="arrow" width={24} height={24} className="transform rotate-180" color="blue" />
      </button>

      {/* Стрелочка справа */}
      <button
        onClick={nextImage}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 bg-white opacity-60 p-2 rounded-full transition-transform duration-300 ease-in-out"
      >
        <SvgSprite name="arrow" width={24} height={24} color="blue" />
      </button>
    </>
  );
}
