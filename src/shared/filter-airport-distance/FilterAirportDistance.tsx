'use client';

import React, { useState } from 'react';

import { Typography } from '../typography';
import { IFilterAirportDistance } from './FilterAirportDistance.types';
import { RadioButton } from '../ui/radio-button';

const distances = ['Любое', 'До 15 км', 'До 50 км', 'До 75 км', 'До 100 км'];

export function FilterAirportDistance({
  selectedDistance,
  onDistanceChange,
}: IFilterAirportDistance) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <div className='rounded-lg bg-white p-4 shadow-md'>
      <div className='mb-4 flex items-center justify-between'>
        <Typography variant='l' className='text-blue-950'>
          Расстояние до аэропорта
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
        <ul className='grid grid-cols-1 gap-2'>
          {distances.map((distance) => (
            <li key={distance} className='mb-2 flex items-center gap-2 text-blue-950'>
              <RadioButton
                label={distance}
                isSelected={selectedDistance === distance}
                onChange={() => onDistanceChange(distance)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
