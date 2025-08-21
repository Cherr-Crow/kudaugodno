import React, { useEffect, useRef, useState } from 'react';

import { nanoid } from 'nanoid';
import { useScreen } from 'usehooks-ts';

import { PopupWindow } from '@/shared/ui/popup-window';
import { SvgSprite } from '@/shared/ui/svg-sprite';

import { ISelect } from './Select.types';

export function Select({
  className,
  arrowClass,
  options,
  getValue,
  color,
  arrowHidden,
  size = 'medium',
  id,
  startValue,
  onSelect,
  value,
  disabled,
  Icon = 'arrow',
}: ISelect & { onSelect?: (value: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(startValue ?? options[0]);
  const screen = useScreen();
  const dropdownRef = useRef<HTMLDivElement>(null);

  enum Background {
    'blue' = 'border border-blue-300 bg-blue-200',
    'green' = 'border border-green-500 bg-green-300',
  }

  enum Size {
    'default' = 'rounded-full py-0 px-0',
    'small' = 'rounded-md py-2 px-4',
    'medium' = 'rounded-full p-4',
    'mobile' = 'rounded-[20px] w-20 h-[30px] px-5 md:w-[52px] md:px-3 lg:w-[83px] lg:p-5',
    'meals' = 'rounded-[20px] w-[180px] h-[30px] px-5 md:w-[164px] md:px-3 lg:w-[180px] lg:p-5',
    'settings' = 'rounded-[20px] px-4 py-2 flex gap-0',
    'catalog' = 'rounded-[8px] max-w-[174px] px-3 py-[11.5px] !gap-2 md:max-w-[192px] lg:px-5 lg:py-[9px] lg:max-w-[226px]',
  }

  useEffect(() => {
    if (value !== undefined) {
      setSelectedOption(value);
    }
  }, [value]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect?.(option);
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
    if (!startValue) return;
    setSelectedOption(startValue);
  }, [startValue]);

  useEffect(() => {
    getValue?.(selectedOption);
  }, [selectedOption]);

  return (
    <div
      className={`relative w-fit cursor-pointer ${className} ui-select`}
      ref={dropdownRef}
    >
      <div
        className={`flex items-center justify-between gap-6 ${Size[size]} ${color ? Background[color] : 'bg-transparent'}`}
        onClick={disabled ? undefined : handleToggle}
      >
        <input
          type='text'
          value={selectedOption}
          readOnly
          className='pointer-events-none h-[18px] w-full cursor-pointer bg-transparent font-medium tracking-tight outline-none md:tracking-normal'
          id={id}
          name='select'
        />
        {!disabled && (
          <SvgSprite
            name={Icon}
            width={size === 'settings' ? 32 : 20}
            strokeWidth={size === 'settings' || 'catalog' ? 2 : 1}
            className={`cursor-pointer ${arrowClass} ${Icon != 'arrow' ? '' : isOpen ? '-rotate-90' : 'rotate-90'} ${
              screen?.width < 1280 && arrowHidden && 'hidden'
            }`}
          />
        )}
      </div>
      {isOpen && !disabled && (
        <PopupWindow className='right-0 top-[110%] w-full'>
          <ul className='dropdown-list z-20 max-h-60 overflow-y-auto overflow-x-hidden py-2'>
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
  );
}
