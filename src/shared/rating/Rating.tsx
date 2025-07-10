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
      {new Array(5).fill(1).map((_, index) => {
        const isFilled = index + 1 <= category;

        if (!emptyStarsInclude && !isFilled) {
          return null;
        }

        return (
          <li
            className={setRating ? 'cursor-pointer' : ''}
            key={index}
            onClick={() => setRating?.(index + 1)}
          >
            <SvgSprite
              name={isFilled ? 'star-full' : 'star'}
              width={starSize}
              className='text-blue-700'
            />
          </li>
        );
      })}
    </ul>
  );
}
