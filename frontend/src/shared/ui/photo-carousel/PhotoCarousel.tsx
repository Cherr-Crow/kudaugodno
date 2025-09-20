import React, { useState } from 'react';

import { IPhotoCarousel } from './PhotoCarousel.types';

export function PhotoCarousel({
  photos,
  className = '',
  buttonPositionClass = 'top-1/2 -translate-y-1/2',
}: IPhotoCarousel) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const handlePrev = () => {
    setCurrentPhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentPhotoIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      <img
        src={photos[currentPhotoIndex].photo}
        alt={`Фото ${currentPhotoIndex + 1}`}
        className='h-full w-full object-cover'
      />

      <button
        onClick={handlePrev}
        className={`absolute left-0 top-0 h-full w-[30%] ${buttonPositionClass}`}
      ></button>
      <button
        onClick={handleNext}
        className={`absolute right-0 top-0 h-full w-[30%] ${buttonPositionClass}`}
      ></button>
    </div>
  );
}
