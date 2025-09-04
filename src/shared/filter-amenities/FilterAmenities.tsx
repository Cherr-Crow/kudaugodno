'use client';

import React, { useState } from 'react';

import { IFilterAmenities } from './FilterAmenities.types';
import { Checkbox } from '../ui/checkbox';
import { Typography } from '../ui/typography';

export function FilterAmenities({
  selectedAmenities,
  onAmenitiesChange,
}: IFilterAmenities) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const amenities = [
    'Бассейн',
    'Собственный пляж',
    'Семейные номера',
    'Детский клуб',
    'Аквапарк',
    'Теннисный корт',
    'Ресторан a la carte',
    'Бесплатный интернет',
  ];

  const toggleAmenity = (amenity: string) => {
    const amenityLowerCase = amenity.toLowerCase();
    const updatedAmenities = selectedAmenities.some(
      (item) => item === amenityLowerCase,
    )
      ? selectedAmenities.filter((item) => item !== amenityLowerCase)
      : [...selectedAmenities, amenityLowerCase];

    onAmenitiesChange(updatedAmenities);
  };

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <div className='filter-amenities rounded-lg bg-white p-4 shadow-md'>
      {/* Заголовок */}
      <div
        className={`flex items-center justify-between ${isCollapsed ? 'mb-0' : 'mb-4'}`}
      >
        <Typography variant='l' className='text-blue-950'>
          Удобства
        </Typography>
        <button
          onClick={toggleCollapse}
          className='text-blue-950'
          aria-label={isCollapsed ? 'Развернуть' : 'Свернуть'}
        >
          {isCollapsed ? '+' : '–'}
        </button>
      </div>

      {/* Контент с анимацией */}
      <div
        className={`transition-max-height overflow-hidden duration-500 ease-in-out ${
          isCollapsed ? 'max-h-0' : 'max-h-[1000px]'
        }`}
      >
        {/* Блоки с удобствами */}
        <div className='transition-max-height overflow-hidden duration-300 ease-in-out'>
          <ul className='grid grid-cols-1 gap-2'>
            {amenities.map((amenity, index) => (
              <li key={amenity} className='mb-2 flex items-center gap-2'>
                <Checkbox
                  id={`checkbox-${index}`}
                  label={amenity}
                  isChecked={selectedAmenities.includes(amenity)}
                  onChange={() => toggleAmenity(amenity)}
                  className='mr-2 text-blue-950'
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
