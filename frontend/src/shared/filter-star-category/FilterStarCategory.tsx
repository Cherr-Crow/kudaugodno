'use client';

import React, { useState } from 'react';

import { IFilterStarCategory } from './FilterStarCategory.types';
import { SvgSprite } from '../ui/svg-sprite';
import { Typography } from '../ui/typography';

export function FilterStarCategory({
  starCategory,
  onStarCategoryChange,
}: IFilterStarCategory) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const toggleStarSelection = (stars: number) => {
    if (starCategory.includes(stars)) {
      onStarCategoryChange([]);
    } else {
      onStarCategoryChange([stars]);
    }
  };

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <div className='filter-star-category rounded-lg bg-white p-4 shadow-md'>
      {/* Заголовок */}
      <div
        className={`flex items-center justify-between ${isCollapsed ? 'mb-0' : 'mb-4'}`}
      >
        <Typography variant='l' className='text-blue-950'>
          Категория отеля
        </Typography>
        <button
          onClick={toggleCollapse}
          className={isCollapsed ? 'mt-1 text-blue-950' : 'text-blue-950'}
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
        {/* Категории звезд */}
        <div className='flex flex-wrap gap-4'>
          {/* Блоки звёзд */}
          {[5, 4, 3, 2, 1].map((stars) => (
            <div
              key={stars}
              className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 transition hover:bg-blue-200 ${
                starCategory.includes(stars)
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-grey-300 bg-white text-blue-950'
              }`}
              onClick={() => toggleStarSelection(stars)}
            >
              <span>{stars}</span>
              <SvgSprite
                name='star'
                width={24}
                className={
                  starCategory.includes(stars) ? 'fill-white' : 'fill-blue-600'
                }
              />
            </div>
          ))}

          {/* Блок "Без звезд" */}
          <div
            className={`cursor-pointer rounded-lg border px-4 py-2 transition hover:bg-blue-200 ${
              starCategory.includes(0)
                ? 'border-blue-600 bg-blue-600 text-white'
                : 'border-grey-300 bg-white text-blue-950'
            }`}
            onClick={() => toggleStarSelection(0)}
          >
            Без звезд
          </div>
        </div>
      </div>
    </div>
  );
}
