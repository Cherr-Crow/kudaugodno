'use client';

import React from 'react';

import { SvgSprite } from '@/shared/ui/svg-sprite';

import { IRating } from './Rating.types';

export function Rating({
  setRating,
  category,
  gap = 8,
  starSize = 24,
  emptyStarsInclude = false,
}: IRating) {
  return (
    <ul className='flex items-center' style={{ gap: `${gap}px` }}>
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= category;

        // --- READ-ONLY режим (только отображение)
        if (!setRating) {
          if (!emptyStarsInclude && !isFilled) {
            return null;
          }

          return (
            <li key={index}>
              <SvgSprite
                name={isFilled ? 'star-full' : 'star'}
                width={starSize}
                className='text-blue-700'
              />
            </li>
          );
        }

        // --- EDITABLE режим (можно кликать)
        return (
          <li
            key={index}
            className='cursor-pointer'
            onClick={() => setRating(starValue)}
          >
            <SvgSprite
              name={isFilled ? 'star-full' : 'star'}
              width={starSize}
              height={starSize}
              className='text-blue-700'
            />
          </li>
        );
      })}
    </ul>
  );
}
