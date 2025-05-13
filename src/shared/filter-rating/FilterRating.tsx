'use client';

import React, { useEffect, useState } from 'react';

import { IFilterRating } from './FilterRating.types';
import { Typography } from '../ui/typography';

export function FilterRating({ rating, onRatingChange }: IFilterRating) {
  const [ratingRange, setRatingRange] = useState<[number, number]>(rating);
  const [minInput, setMinInput] = useState('');
  const [maxInput, setMaxInput] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const minRating = 1;
  const maxRating = 10;

  const histogramData = [
    6.74, 2.15, 1.15, 9.59, 5.71, 1.75, 6.46, 6.68, 5.18, 8.33, 4.55, 7.87, 3.21,
    8.02, 5.91, 2.45, 7.13, 6.02, 3.88, 7.75, 9.11, 8.11, 3.45, 6.99, 4.93, 6.21,
  ];

  const frequencyData = Array(10).fill(0);
  histogramData.forEach((value) => {
    const rounded = Math.round(value);
    if (rounded >= 1 && rounded <= 10) {
      frequencyData[rounded - 1]++;
    }
  });

  useEffect(() => {
    setRatingRange(rating);
    setMinInput(rating[0].toString());
    setMaxInput(rating[1].toString());
  }, [rating]);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const parseInput = (value: string) => {
    const parsed = parseFloat(value.replace(',', '.'));
    return isNaN(parsed) ? 0 : parsed;
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinInput(e.target.value);
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxInput(e.target.value);
  };

  const handleMinInputBlur = () => {
    const parsed = parseInput(minInput);
    if (parsed >= minRating && parsed <= ratingRange[1]) {
      const newRange: [number, number] = [parsed, ratingRange[1]];
      setRatingRange(newRange);
      onRatingChange(newRange);
    } else {
      setMinInput(ratingRange[0].toString());
    }
  };

  const handleMaxInputBlur = () => {
    const parsed = parseInput(maxInput);
    if (parsed <= maxRating && parsed >= ratingRange[0]) {
      const newRange: [number, number] = [ratingRange[0], parsed];
      setRatingRange(newRange);
      onRatingChange(newRange);
    } else {
      setMaxInput(ratingRange[1].toString());
    }
  };

  return (
    <div className='filter-rating rounded-lg bg-white p-4 shadow-md'>
      <div className='mb-4 flex items-center justify-between'>
        <Typography variant='l' className='text-blue-950'>
          Оценка
        </Typography>
        <button
          onClick={toggleCollapse}
          className={isCollapsed ? 'mt-1 text-blue-950' : 'text-blue-950'}
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
        {/* Гистограмма */}
        <div className='histogram relative mb-4 flex h-16 items-end gap-1 rounded-lg'>
          {frequencyData.map((height, index) => {
            const maxFreq = Math.max(...frequencyData);
            const heightPct = (height / maxFreq) * 100;
            const isInRange =
              index + 1 >= ratingRange[0] && index + 1 <= ratingRange[1];
            return (
              <div
                key={index}
                className={`flex-1 ${isInRange ? 'bg-blue-300' : 'bg-blue-100'} transition-colors duration-300`}
                style={{ height: `${heightPct}%` }}
              />
            );
          })}
        </div>

        {/* Слайдер */}
        <div className='slider relative mx-auto mb-4 flex h-1 w-[93%] rounded-lg px-4'>
          <div
            className='absolute h-1 rounded-lg bg-blue-800'
            style={{
              left: `${((ratingRange[0] - minRating) / (maxRating - minRating)) * 100}%`,
              width: `${Math.min(
                ((ratingRange[1] - ratingRange[0]) / (maxRating - minRating)) * 100,
                100 - ((ratingRange[0] - minRating) / (maxRating - minRating)) * 100,
              )}%`,
              maxWidth: '100%',
            }}
          >
            <div className='absolute -left-[6px] top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-blue-800 shadow'></div>
            <div className='absolute -right-[6px] top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-blue-800 shadow'></div>
          </div>
        </div>

        {/* Поля ввода */}
        <div className='flex justify-between gap-4'>
          <input
            type='text'
            inputMode='decimal'
            className='w-full rounded-md border border-grey-300 px-3 py-2 text-sm shadow-sm outline-none'
            value={minInput}
            onChange={handleMinInputChange}
            onBlur={handleMinInputBlur}
            placeholder='От'
          />
          <input
            type='text'
            inputMode='decimal'
            className='w-full rounded-md border border-grey-300 px-3 py-2 text-sm shadow-sm outline-none'
            value={maxInput}
            onChange={handleMaxInputChange}
            onBlur={handleMaxInputBlur}
            placeholder='До'
          />
        </div>
      </div>
    </div>
  );
}
