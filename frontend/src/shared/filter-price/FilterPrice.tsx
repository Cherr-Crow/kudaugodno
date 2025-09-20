'use client';

import React, { useState, useEffect } from 'react';

import { useSearchParams } from 'next/navigation';

import { IFilterPrice } from './FilterPrice.types';
import { RadioButton } from '../ui/radio-button';
import { Typography } from '../ui/typography';

export function FilterPrice({ price, onPriceChange }: IFilterPrice) {
  const [priceRange, setPriceRange] = useState<[number, number]>(price);
  const [minInput, setMinInput] = useState('');
  const [maxInput, setMaxInput] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const tab = useSearchParams().get('tab');

  const priceOptions: { label: string; range: [number, number] }[] =
    tab === 'Отели'
      ? [
          { label: 'до 4 000 ₽', range: [0, 4000] },
          { label: '4 000 – 8 000 ₽', range: [4000, 8000] },
          { label: '8 000 – 12 000 ₽', range: [8000, 12000] },
          { label: '12 000 – 20 000 ₽', range: [12000, 20000] },
          { label: '20 000 – 40 000 ₽', range: [20000, 40000] },
          { label: '40 000 ₽ и дороже', range: [40000, Infinity] },
          { label: 'Неважно', range: [0, Infinity] },
        ]
      : [
          { label: 'до 12 000 ₽', range: [0, 12000] },
          { label: '12 000 – 40 000 ₽', range: [12000, 40000] },
          { label: '40 000 – 100 000 ₽', range: [40000, 100000] },
          { label: '100 000 – 200 000 ₽', range: [100000, 200000] },
          { label: '200 000 – 300 000 ₽', range: [200000, 300000] },
          { label: '300 000 ₽ и дороже', range: [300000, Infinity] },
          { label: 'Неважно', range: [0, Infinity] },
        ];

  useEffect(() => {
    setPriceRange(price);
    setMinInput(price[0].toString());
    setMaxInput(price[1] === Infinity ? '' : price[1].toString());
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
      setMaxInput(priceRange[1] === Infinity ? '' : priceRange[1].toString());
    }
  };

  const handleRadioChange = (range: [number, number]) => {
    setPriceRange(range);
    setMinInput(range[0].toString());
    setMaxInput(range[1] === Infinity ? '' : range[1].toString());
    onPriceChange(range);
  };

  return (
    <div className='filter-price rounded-lg bg-white p-4 shadow-md'>
      <div
        className={`flex items-center justify-between ${isCollapsed ? 'mb-0' : 'mb-4'}`}
      >
        <Typography variant='l' className='text-blue-950'>
          {tab === 'Отели' ? 'Цена за ночь' : 'Цена за тур'}
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
        className={`transition-max-height flex flex-col gap-2 overflow-hidden duration-500 ease-in-out ${
          isCollapsed ? 'max-h-0' : 'max-h-[1000px]'
        }`}
      >
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
        {/* Радио кнопки */}
        <div className='flex flex-col gap-2 text-blue-950'>
          {priceOptions.map((option) => (
            <RadioButton
              key={option.label}
              label={option.label}
              isSelected={
                priceRange[0] === option.range[0] &&
                priceRange[1] === option.range[1]
              }
              onChange={() => handleRadioChange(option.range)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
