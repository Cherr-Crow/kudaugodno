import React, { useEffect, useRef, useState } from 'react';

import { nanoid } from 'nanoid';

import { ISelectForSearchBlock } from './SelectForSearchBlock.types';
import { PopupWindow } from '../ui/popup-window';
import { SvgSprite } from '../ui/svg-sprite';
import { Typography } from '../ui/typography';
// eslint-disable-next-line import/order

type SelectType = 'guests' | 'nights';

interface Props extends ISelectForSearchBlock {
  className?: string;
  type: SelectType;
  startValue?: string;
  disabled?: boolean;
  onValueSelect?: (value: string) => void;
}

export function SelectForSearchBlock({
  className,
  getValue,
  type,
  startValue,
  disabled,
  onValueSelect,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const placeholder = type === 'guests' ? 'Гостей' : 'Ночей';
  const generateOptions = (type: SelectType): string[] => {
    if (type === 'guests') {
      return [
        '1 гость',
        '2 гостя',
        '3 гостя',
        '4 гостя',
        '5 гостей',
        '6 гостей',
        '7 гостей',
        '8 гостей',
        '9 гостей',
        '10 гостей',
      ];
    }

    if (type === 'nights') {
      return [
        '1 ночь',
        '2 ночи',
        '3 ночи',
        '4 ночи',
        '5 ночей',
        '6 ночей',
        '7 ночей',
        '8 ночей',
        '9 ночей',
        '10 ночей',
      ];
    }

    return [];
  };

  const options = generateOptions(type);
  const [selectedOption, setSelectedOption] = useState(startValue ?? options[0]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onValueSelect?.(option);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleSelectChange = (value: string) => {
    getValue?.(value);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (!startValue) return;
    setSelectedOption(startValue);
  }, [startValue]);

  useEffect(() => {
    getValue?.(selectedOption);
  }, [selectedOption]);

  return (
    <div
      className={`relative flex min-h-[50px] w-full justify-items-stretch md:h-full ${className ?? ''}`}
    >
      <div className='flex h-full w-full flex-col justify-center'>
        {startValue && (
          <>
            <Typography variant='s' className='text-grey-400'>
              {placeholder}
            </Typography>
          </>
        )}
        <div
          className={`z-60 ui-select relative w-full`}
          ref={dropdownRef}
          onClick={handleToggle}
        >
          <input
            name='select'
            value={startValue ?? ''}
            onChange={(e) => handleSelectChange(e.target.value)}
            className='w-full cursor-pointer appearance-none rounded-full px-0 py-0 font-medium outline-none md:font-semibold'
          ></input>

          {!disabled && (
            <SvgSprite
              name='arrow'
              width={20}
              strokeWidth={1}
              className={`z-60 pointer-events-none absolute -top-2 right-1 rotate-90 md:-top-3 md:right-3 lg:right-4`}
            />
          )}
          {isOpen && !disabled && (
            <PopupWindow className='right-0 top-[140%] w-full'>
              <ul className='dropdown-list z-100 max-h-60 overflow-y-auto overflow-x-hidden py-2'>
                {options.map((option) => (
                  <li
                    key={nanoid()}
                    className='px-4 py-2 hover:bg-blue-100'
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </PopupWindow>
          )}
        </div>
      </div>
    </div>
  );
}
