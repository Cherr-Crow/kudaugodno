'use client';

import React, { useState } from 'react';

import { Typography } from '../typography';
import { IFilterTypeOfMeals } from './FilterTypeOfMeals.types';
import { Checkbox } from '../ui/checkbox';

export function FilterTypeOfMeals({
  selectedMeals,
  onMealChange,
}: IFilterTypeOfMeals) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const mealOptions = [
    'Без питания',
    'Ultra all inclusive',
    'All inclusive',
    'Полный пансион',
    'Полупансион',
    'Только завтраки',
  ];

  const toggleMealSelection = (meal: string) => {
    const updatedMeals = selectedMeals.includes(meal)
      ? selectedMeals.filter((item) => item !== meal)
      : [...selectedMeals, meal];

    onMealChange(updatedMeals);
  };

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <div className='filter-type-of-meals rounded-lg bg-white p-4 shadow-md'>
      {/* Заголовок */}
      <div className='mb-4 flex items-center justify-between'>
        <Typography variant='l'>Тип питания</Typography>
        <button
          onClick={toggleCollapse}
          className='text-gray-500'
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
        {/* Опции питания с чекбоксами */}
        <div className='transition-max-height overflow-hidden duration-300 ease-in-out'>
          <ul className='grid grid-cols-1 gap-2'>
            {mealOptions.map((meal) => (
              <li key={meal} className='mb-2 flex items-center gap-2'>
                <Checkbox
                  label={meal}
                  isChecked={selectedMeals.includes(meal)}
                  onChange={() => toggleMealSelection(meal)}
                  className='mr-2'
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
