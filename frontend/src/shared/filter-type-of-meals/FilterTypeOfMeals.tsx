'use client';

import React, { useState } from 'react';

import { IFilterTypeOfMeals } from './FilterTypeOfMeals.types';
import { Checkbox } from '../ui/checkbox';
import { Typography } from '../ui/typography';

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
    const mealLowerCase = meal.toLowerCase();
    const updatedMeals = selectedMeals.some(
      (item) => item.toLowerCase() === mealLowerCase,
    )
      ? selectedMeals.filter((item) => item.toLowerCase() !== mealLowerCase)
      : [...selectedMeals, meal];

    onMealChange(updatedMeals);
  };

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <div className='filter-type-of-meals rounded-lg bg-white p-4 shadow-md'>
      {/* Заголовок */}
      <div
        className={`flex items-center justify-between ${isCollapsed ? 'mb-0' : 'mb-4'}`}
      >
        <Typography variant='l' className='text-blue-950'>
          Питание
        </Typography>
        <button
          onClick={toggleCollapse}
          className='text-blue-950'
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
            {mealOptions.map((meal, index) => (
              <li key={meal} className='mb-2 flex items-center gap-2'>
                <Checkbox
                  id={`checkbox-${index}`}
                  label={meal}
                  isChecked={selectedMeals.includes(meal)}
                  onChange={() => toggleMealSelection(meal)}
                  className='mr-2 text-blue-950'
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
