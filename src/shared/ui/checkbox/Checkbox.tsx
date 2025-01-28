'use client';

import React, { useState } from 'react';

import { ICheckbox } from './Checkbox.types';

const Checkbox: React.FC<ICheckbox> = ({
  label,
  isChecked,
  isDisabled,
  onChange,
  className,
}) => {
  const [checked, setChecked] = useState(isChecked ?? false);

  const handleToggle = () => {
    if (isDisabled) return;
    setChecked(!checked);
    onChange && onChange(!checked);
  };

  return (
    <div
      className={`flex items-center space-x-2 ${className}`}
      onClick={handleToggle}
    >
      <button
        role='switch'
        className={`border-1 flex h-6 w-6 items-center justify-center rounded-lg border border-grey-600 transition-colors duration-300 ${isDisabled ? 'cursor-not-allowed bg-grey-100' : checked ? 'border-0 bg-blue-600' : 'bg-grey-100'} ${!isDisabled && 'focus:outline-2 focus:outline-blue-600'} `}
        disabled={isDisabled}
        aria-checked={checked}
      >
        {checked && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            className={`h-6 w-6 transform text-white transition-opacity duration-300`}
          >
            <path d='M5 13l4 4L19 7' />
          </svg>
        )}
      </button>
      <div
        className={`cursor-pointer text-sm font-medium ${isDisabled ? 'text-gray-400' : 'text-gray-900'}`}
      >
        {label ?? ''}
      </div>
    </div>
  );
};

export default Checkbox;
