'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ISelect } from './Select.types';
import { PopupWindow } from '@/shared/popup-window';
import { nanoid } from 'nanoid';
import { SvgSprite } from '@/shared/svg-sprite';

export function Select({ className, options, getValue, color }: ISelect) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  enum Background {
    'blue' = 'border border-blue-primary bg-blue-300',
    'green' = 'border border-green-tetriary bg-green-secondary',
  }

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleOutsideClick = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
    getValue && getValue(selectedOption);
  }, [selectedOption]);

  return (
    <div className={`relative w-fit cursor-pointer ${className}`} ref={dropdownRef}>
      <div
        className={`flex items-center justify-between rounded-full p-4 ${color ? Background[color] : 'bg-transparent'}`}
        onClick={handleToggle}
      >
        <input
          type='text'
          value={selectedOption}
          onChange={() => {}}
          className='pointer-events-none cursor-pointer bg-transparent outline-none w-4/5'
        />
        <SvgSprite
          name='arrow'
          width={20}
          className={`cursor-pointer ${isOpen ? '-rotate-90' : 'rotate-90'}`}
        />
      </div>
      {isOpen && (
        <PopupWindow className='top-[110%] w-full'>
          <ul className='dropdown-list py-2'>
            {options.map((option) => (
              <li
                key={nanoid()}
                className='px-4 py-2 hover:bg-blue-extra-light'
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </PopupWindow>
      )}
    </div>
  );
}
