'use client';

import React, { useState } from 'react';

import { IFilterRecreationType } from './FilterRecreationType.types';
import { Typography } from '../ui/typography';

export function FilterRecreationType({
  selectedTypes,
  onTypeChange,
}: IFilterRecreationType) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const recreationTypes = [
    'Пляжный',
    'Городской',
    'Лечебный',
    'С животными',
    'Спа',
    'С детьми',
  ];

  const toggleSelection = (type: string) => {
    const updatedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((item) => item !== type)
      : [...selectedTypes, type];
    onTypeChange(updatedTypes);
  };

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <div className='filter-recreation-type rounded-lg bg-white p-4 shadow-md'>
      {/* Заголовок */}
      <div
        className={`flex items-center justify-between ${isCollapsed ? 'mb-0' : 'mb-4'}`}
      >
        <Typography variant='l' className='text-blue-950'>
          Тип отдыха
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
        {/* Блоки с типами отдыха */}
        <div className='flex flex-wrap gap-4'>
          {recreationTypes.map((type) => (
            <button
              key={type}
              onClick={() => toggleSelection(type)}
              className={`rounded-lg border p-4 text-center transition-all ${
                selectedTypes.includes(type)
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
