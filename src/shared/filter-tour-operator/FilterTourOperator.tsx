'use client';

import React, { useState } from 'react';

import { IFilterTourOperator } from './FilterTourOperator.types';
import { Checkbox } from '../ui/checkbox';
import { Typography } from '../ui/typography';

const tourOperators = ['Тез тур', 'Санмар', 'Библио Глобус', 'Интурист', 'Пегас'];

export function FilterTourOperator({
  selectedOperators,
  onOperatorsChange,
}: IFilterTourOperator) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleOperator = (operator: string) => {
    const operatorLowerCase = operator.toLowerCase();
    const updatedOperators = selectedOperators.some(
      (item) => item.toLowerCase() === operatorLowerCase,
    )
      ? selectedOperators.filter((item) => item.toLowerCase() !== operatorLowerCase)
      : [...selectedOperators, operatorLowerCase];

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
                isChecked={selectedOperators.some(
                  (item) => item.toLowerCase() === operator.toLowerCase(),
                )}
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
