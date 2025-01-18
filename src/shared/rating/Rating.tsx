'use client';

import React, { useEffect, useState } from 'react';
import { IRating } from './Rating.types';
import { SvgSprite } from '@/shared/svg-sprite';

export function Rating({ setRating, category }: IRating) {
  return (
    <ul className='flex gap-2'>
      {new Array(5).fill(1).map((_, index) => {
        return (
          <li
            className={`${setRating ? 'cursor-pointer' : null}`}
            key={index}
            onClick={() => (setRating ? setRating(index) : {})}
          >
            {index + 1 <= category ? (
              <SvgSprite name='star-full' width={24} />
            ) : (
              <SvgSprite name='star' width={24} />
            )}
          </li>
        );
      })}
    </ul>
  );
}
