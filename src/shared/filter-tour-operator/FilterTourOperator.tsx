'use client';

import React, { useState } from 'react';

import { Typography } from '../typography';
import { IFilterTourOperator } from './FilterTourOperator.types';
import { Checkbox } from '../ui/checkbox';

const tourOperators = ['Тез тур', 'Санмар', 'Библио Глобус', 'Интурист', 'Пегас'];

export function FilterTourOperator({
  selectedOperators,
  onOperatorsChange,
}: IFilterTourOperator) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleOperator = (operator: string) => {
    const updatedOperators = selectedOperators.includes(operator)
      ? selectedOperators.filter((item) => item !== operator)
      : [...selectedOperators, operator];

    onOperatorsChange(updatedOperators);
  };

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <div className='rounded-lg bg-white p-4 shadow-md'>
      <div className='mb-4 flex items-center justify-between'>
        <Typography variant='l' className='text-blue-950'>
          Туроператор
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
          {tourOperators.map((operator, index) => (
            <li key={operator} className='mb-2 flex items-center gap-2'>
              <Checkbox
                id={`checkbox-${index}`}
                label={operator}
                isChecked={selectedOperators.includes(operator)}
                onChange={() => toggleOperator(operator)}
                className='text-blue-950'
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
