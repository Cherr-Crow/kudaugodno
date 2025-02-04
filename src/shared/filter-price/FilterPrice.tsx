'use client';

import React, { useState, useRef, useEffect } from 'react';

import { Typography } from '../typography';
import { IFilterPrice } from './FilterPrice.types';

export function FilterPrice({ price, onPriceChange }: IFilterPrice) {
  const [priceRange, setPriceRange] = useState<[number, number]>(price);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const minPrice = 1000;
  const maxPrice = 20000;

  const priceData = [
    2000, 5000, 8000, 10000, 15000, 12000, 18000, 14000, 10000, 5000, 3000, 12000,
    7000, 13000, 16000, 1000, 17000, 19000, 6000, 11000,
  ];

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef<'left' | 'right' | null>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingRef.current || !sliderRef.current) return;

    const sliderRect = sliderRef.current.getBoundingClientRect();
    const relativeX = Math.min(
      Math.max(e.clientX - sliderRect.left, 0),
      sliderRect.width,
    );
    const percentage = relativeX / sliderRect.width;
    const newPrice = Math.round(minPrice + percentage * (maxPrice - minPrice));

    setPriceRange((prev) => {
      if (isDraggingRef.current === 'left') {
        return [Math.min(newPrice, prev[1] - 500), prev[1]];
      } else {
        return [prev[0], Math.max(newPrice, prev[0] + 500)];
      }
    });
  };

  const handleMouseDown = (side: 'left' | 'right') => {
    isDraggingRef.current = side;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    onPriceChange(priceRange);
  };

  useEffect(() => {
    setPriceRange(price);
  }, [price]);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const calculateHistogramData = () => {
    const intervals = 10;
    const intervalWidth = (maxPrice - minPrice) / intervals;
    const histogramData = Array(intervals).fill(0);

    priceData.forEach((price) => {
      if (price >= minPrice && price <= maxPrice) {
        const index = Math.floor((price - minPrice) / intervalWidth);
        histogramData[Math.min(index, intervals - 1)] += 1;
      }
    });

    return histogramData;
  };

  const histogramData = calculateHistogramData();

  return (
    <div className='filter-price rounded-lg bg-white p-2 shadow-md'>
      {/* Заголовок */}
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

      {/* Контент с анимацией */}
      <div
        className={`transition-max-height overflow-hidden p-4 duration-500 ease-in-out ${
          isCollapsed ? 'max-h-0' : 'max-h-[1000px]'
        }`}
      >
        {/* Гистограмма */}
        <div className='histogram relative mb-4 flex h-16 items-end gap-1 rounded-lg'>
          {histogramData.map((height, index) => {
            const maxFrequency = Math.max(...histogramData);
            const heightPercentage = (height / maxFrequency) * 100;
            return (
              <div
                key={index}
                className='flex-1 bg-blue-300'
                style={{ height: `${heightPercentage}%` }}
              ></div>
            );
          })}
        </div>

        {/* Слайдер */}
        <div
          className='slider relative mb-4 h-1 rounded-lg bg-grey-200'
          ref={sliderRef}
        >
          {/* Диапазон (заливка между ползунками) */}
          <div
            className='absolute h-1 rounded-lg bg-blue-800'
            style={{
              left: `${((priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100}%`,
              width: `${((priceRange[1] - priceRange[0]) / (maxPrice - minPrice)) * 100}%`,
            }}
          ></div>

          {/* Левый ползунок */}
          <div
            className='absolute h-4 w-4 cursor-pointer rounded-full bg-blue-800'
            style={{
              left: `${((priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100}%`,
              transform: 'translate(-50%, -50%)',
              top: '50%',
            }}
            onMouseDown={() => handleMouseDown('left')}
          ></div>

          {/* Правый ползунок */}
          <div
            className='absolute h-4 w-4 cursor-pointer rounded-full bg-blue-800'
            style={{
              left: `${((priceRange[1] - minPrice) / (maxPrice - minPrice)) * 100}%`,
              transform: 'translate(-50%, -50%)',
              top: '50%',
            }}
            onMouseDown={() => handleMouseDown('right')}
          ></div>
        </div>

        {/* Диапазон цен */}
        <div className='flex justify-between text-sm'>
          <span>{priceRange[0]} ₽</span>
          <span>{priceRange[1]} ₽</span>
        </div>
      </div>
    </div>
  );
}
