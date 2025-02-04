'use client';

import React from 'react';

import { SvgSprite } from '@/shared/svg-sprite';

import { IRating } from './Rating.types';

export function Rating({ setRating, category, gap = 8, starSize = 24 }: IRating) {
  return (
    <ul className="flex items-center" style={{ gap: `${gap}px` }}>
      {new Array(5).fill(1).map((_, index) => (
        <li
          className={setRating ? 'cursor-pointer' : ''}
          key={index}
          onClick={() => (setRating ? setRating(index) : {})}
        >
          {index + 1 <= category ? (
            <SvgSprite name="star-full" width={starSize} />
          ) : (
            <SvgSprite name="star" width={starSize} />
          )}
        </li>
      ))}
    </ul>
  );
}
