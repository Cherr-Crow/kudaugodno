'use client';

import React, { useEffect, useState } from 'react';

import { IFilterRating } from './FilterRating.types';
import { RadioButton } from '../ui/radio-button';
import { Typography } from '../ui/typography';

const ratingOptions = [
  { label: 'Супер: 9+', value: 9 },
  { label: 'Отлично: 8+', value: 8 },
  { label: 'Очень хорошо: 7+', value: 7 },
  { label: 'Хорошо: 6+', value: 6 },
  { label: 'Неплохо: 5+', value: 5 },
];

export function FilterRating({ rating, onRatingChange }: IFilterRating) {
  const [selectedRating, setSelectedRating] = useState<number>(rating[0]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    setSelectedRating(rating[0]);
  }, [rating]);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const handleRatingSelect = (value: number) => {
    setSelectedRating(value);
    onRatingChange([value, 10]);
  };

  return (
    <div className='filter-rating rounded-lg bg-white p-4 shadow-md'>
      <div
        className={`flex items-center justify-between ${isCollapsed ? 'mb-0' : 'mb-4'}`}
      >
        <Typography variant='l' className='text-blue-950'>
          Оценка
        </Typography>
        <button
          onClick={toggleCollapse}
          className='text-blue-950'
          aria-label={isCollapsed ? 'Развернуть' : 'Свернуть'}
        >
          {isCollapsed ? '+' : '–'}
        </button>
      </div>

      <div
        className={`transition-max-height overflow-hidden duration-500 ease-in-out ${
          isCollapsed ? 'max-h-0' : 'max-h-[1000px]'
        }`}
      >
        <div className='flex flex-col gap-2 text-blue-950'>
          {ratingOptions.map((option) => (
            <RadioButton
              key={option.value}
              label={option.label}
              isSelected={selectedRating === option.value}
              onChange={() => handleRatingSelect(option.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
