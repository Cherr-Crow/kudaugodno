'use client';

import React, { useEffect, useRef, useState } from 'react';

import { nanoid } from 'nanoid';
import { useScreen } from 'usehooks-ts';

import { PopupWindow } from '@/shared/popup-window';
import { SvgSprite } from '@/shared/svg-sprite';

import { ISelect } from './Select.types';

export function Select({
  className,
  options,
  getValue,
  color,
  arrowHidden,
  size = 'medium',
  id,
  startValue,
}: ISelect) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(startValue ?? options);
  const screen = useScreen();
  const dropdownRef = useRef<HTMLDivElement>(null);

  enum Background {
    'blue' = 'border border-blue-400 bg-blue-300',
    'green' = 'border border-green-500 bg-green-300',
  }

  enum Size {
    'small' = 'rounded-md py-2 px-4',
    'medium' = 'rounded-full p-4',
    'mobile' = 'rounded-full  w-20 h-7',
  }

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    getValue && getValue(String(selectedOption));
  }, [selectedOption]);

  return (
    <div className={`relative w-fit cursor-pointer ${className}`} ref={dropdownRef}>
      <div
        className={`flex items-center justify-between ${Size[size]} ${color ? Background[color] : 'bg-transparent'} `}
        onClick={handleToggle}
      >
        <input
          type='text'
          value={selectedOption}
          onChange={() => {}}
          className={`pointer-events-none w-4/5 cursor-pointer bg-transparent pl-4 outline-none`}
          id={id}
          name='select'
        />
        <SvgSprite
          name='arrow'
          width={20}
          className={`cursor-pointer ${isOpen ? '-rotate-90' : 'rotate-90'} ${screen?.width < 1280 && arrowHidden && 'hidden'}`}
        />
      </div>
      {isOpen && (
        <PopupWindow className='top-[110%] w-full'>
          <ul className='dropdown-list max-h-60 overflow-scroll py-2'>
            {Array.from({ length: options }).map((_, option) => (
              <li
                key={nanoid()}
                className='px-4 py-2 hover:bg-blue-100'
                onClick={() => handleOptionClick(String(option + 1))}
              >
                {option + 1}
              </li>
            ))}
          </ul>
        </PopupWindow>
      )}
    </div>
  );
}
