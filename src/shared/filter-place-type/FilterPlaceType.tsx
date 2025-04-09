'use client';

import React, { useState } from 'react';

import { Typography } from '../typography';
import { IFilterPlaceType } from './FilterPlaceType.types';

export function FilterPlaceType({
  selectedPlaceTypes,
  onPlaceTypeChange,
}: IFilterPlaceType) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const placeTypes = [
    'Хостел',
    'Вилла',
    'Апартаменты',
    'Отель',
    'Гостевой дом',
    'Гостиница',
  ];

  const toggleSelection = (type: string) => {
    onPlaceTypeChange(
      selectedPlaceTypes.includes(type)
        ? selectedPlaceTypes.filter((item) => item !== type)
        : [...selectedPlaceTypes, type],
    );
  };

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <div className='filter-place-type rounded-lg bg-white p-4 shadow-md'>
      {/* Заголовок */}
      <div className='mb-4 flex items-center justify-between'>
        <Typography variant='l' className='text-blue-950'>
          Тип размещения
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
        {/* Блоки с типами размещения */}
        <div className='flex flex-wrap gap-4'>
          {placeTypes.map((type) => (
            <button
              key={type}
              onClick={() => toggleSelection(type)}
              className={`rounded-lg border p-4 text-center transition-all ${
                selectedPlaceTypes.includes(type)
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-grey-300 bg-grey-50 text-blue-950 hover:bg-blue-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
