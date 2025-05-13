'use client';

import React, { useState, useEffect } from 'react';

import { IFilterPrice } from './FilterPrice.types';
import { Typography } from '../ui/typography';

export function FilterPrice({ price, onPriceChange }: IFilterPrice) {
  const [priceRange, setPriceRange] = useState<[number, number]>(price);
  const [minInput, setMinInput] = useState('');
  const [maxInput, setMaxInput] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const priceData: number[] = [
    1000, 2000, 3000, 5000, 6000, 7000, 8000, 9000, 10000, 12000, 15000, 18000,
    20000, 25000, 30000, 35000, 40000, 1000, 2000, 3000, 5000, 6000, 7000, 8000,
    9000, 10000, 12000, 15000, 18000, 20000, 25000, 30000, 35000, 40000, 1000, 2000,
    3000, 5000, 6000, 7000, 8000, 9000, 10000, 12000, 15000, 18000, 20000, 25000,
    30000, 35000, 40000, 1000, 2000, 3000, 5000, 6000, 7000, 8000, 9000, 10000,
    12000, 15000, 18000, 20000, 25000, 30000, 35000, 40000, 1000, 2000, 3000, 5000,
    6000, 7000, 8000, 9000, 10000, 12000, 15000, 18000, 20000, 25000, 30000, 35000,
    40000, 1000, 2000, 3000, 5000, 6000, 7000, 8000, 9000, 10000, 12000, 15000,
    18000, 20000, 25000, 30000, 35000, 40000, 1000, 2000, 3000, 5000, 6000, 7000,
    8000, 9000, 10000, 12000, 15000, 18000, 20000, 25000, 30000, 35000, 40000, 1000,
    2000, 3000, 5000, 6000, 7000, 8000, 9000, 10000, 12000, 15000, 18000, 20000,
    25000, 30000, 35000, 40000, 1000, 2000, 3000, 5000, 6000, 7000, 8000, 9000,
    10000, 12000, 15000, 18000, 20000, 25000, 30000, 35000, 40000, 45000, 50000,
    55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 15000, 18000, 20000,
    25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000,
    80000, 85000, 90000, 15000, 18000, 20000, 25000, 30000, 35000, 40000, 45000,
    50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 15000, 18000,
    20000, 25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000,
    75000, 80000, 85000, 90000, 15000, 18000, 20000, 25000, 30000, 35000, 40000,
    45000, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 70000,
    75000, 80000, 85000, 90000, 70000, 75000, 80000, 85000, 90000, 70000, 75000,
    80000, 85000, 90000, 70000, 75000, 80000, 85000, 90000, 70000, 75000, 80000,
    85000, 90000, 70000, 75000, 80000, 85000, 90000,
  ];

  useEffect(() => {
    setPriceRange(price);
    setMinInput(price[0].toString());
    setMaxInput(price[1].toString());
  }, [price]);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const parseInput = (value: string) => {
    const parsed = Number(value.replace(/\D/g, ''));
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
    if (!isNaN(parsed) && parsed <= priceRange[1]) {
      const newRange: [number, number] = [parsed, priceRange[1]];
      setPriceRange(newRange);
      onPriceChange(newRange);
    } else {
      setMinInput(priceRange[0].toString());
    }
  };

  const handleMaxInputBlur = () => {
    const parsed = parseInput(maxInput);
    if (!isNaN(parsed) && parsed >= priceRange[0]) {
      const newRange: [number, number] = [priceRange[0], parsed];
      setPriceRange(newRange);
      onPriceChange(newRange);
    } else {
      setMaxInput(priceRange[1].toString());
    }
  };

  const calculateHistogramData = () => {
    const intervals = 10;
    const sorted = [...priceData].sort((a, b) => a - b);
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    const intervalWidth = (max - min) / intervals;
    const histogramData = Array(intervals).fill(0);

    priceData.forEach((p) => {
      const index = Math.floor((p - min) / intervalWidth);
      histogramData[Math.min(index, intervals - 1)] += 1;
    });

    return histogramData;
  };

  const histogramData = calculateHistogramData();

  const minPrice = Math.min(...priceData);
  const maxPrice = Math.max(...priceData);

  return (
    <div className='filter-price rounded-lg bg-white p-4 shadow-md'>
      <div className='mb-4 flex items-center justify-between'>
        <Typography variant='l' className='text-blue-950'>
          Цена за ночь
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
          {histogramData.map((height, index) => {
            const intervals = histogramData.length;
            const sorted = [...priceData].sort((a, b) => a - b);
            const min = sorted[0];
            const max = sorted[sorted.length - 1];
            const intervalWidth = (max - min) / intervals;

            const intervalStart = min + index * intervalWidth;
            const intervalEnd = intervalStart + intervalWidth;

            const isInRange =
              intervalEnd >= priceRange[0] && intervalStart <= priceRange[1];

            const maxFrequency = Math.max(...histogramData);
            const heightPercentage = (height / maxFrequency) * 100;

            return (
              <div
                key={index}
                className={`flex-1 ${isInRange ? 'bg-blue-300' : 'bg-blue-100'} transition-colors duration-300`}
                style={{ height: `${heightPercentage}%` }}
              ></div>
            );
          })}
        </div>

        {/* Слайдер */}
        <div className='slider relative mx-auto mb-4 flex h-1 w-[93%] rounded-lg px-4'>
          <div
            className='absolute h-1 rounded-lg bg-blue-800'
            style={{
              left: `${((priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100}%`,
              width: `${Math.min(
                ((priceRange[1] - priceRange[0]) / (maxPrice - minPrice)) * 100,
                100 - ((priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100,
              )}%`,
              maxWidth: '100%',
            }}
          >
            <div className='absolute -left-[6px] top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-blue-800 shadow'></div>
            <div className='absolute -right-[6px] top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-blue-800 shadow'></div>
          </div>
        </div>

        {/* Инпуты */}
        <div className='flex gap-4'>
          <div className='flex-1'>
            <input
              className='w-full rounded-md border border-grey-300 px-3 py-2 text-sm shadow-sm outline-none'
              value={minInput}
              onChange={handleMinInputChange}
              onBlur={handleMinInputBlur}
              placeholder='от'
              inputMode='numeric'
            />
          </div>
          <div className='flex-1'>
            <input
              className='w-full rounded-md border border-grey-300 px-3 py-2 text-sm shadow-sm outline-none'
              value={maxInput}
              onChange={handleMaxInputChange}
              onBlur={handleMaxInputBlur}
              placeholder='до'
              inputMode='numeric'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
