'use client';

import React, { useState } from 'react';
import { ICheckbox } from './Checkbox.types';

const Checkbox: React.FC<ICheckbox> = ({
  label,
  isChecked = false,
  isDisabled = false,
  onChange = () => {},
}) => {
  const [checked, setChecked] = useState(isChecked);

  const handleToggle = () => {
    if (isDisabled) return;
    const newChecked = !checked;
    setChecked(newChecked);
    onChange(newChecked);
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        className={`h-6 w-6 flex items-center justify-center rounded-lg transition-colors duration-300
          ${isDisabled ? 'cursor-not-allowed bg-white' : checked ? 'bg-blue-600' : 'bg-white'}
          ${!isDisabled && 'focus:outline-2 focus:outline-blue-600 '}
        `}
        onClick={handleToggle}
        disabled={isDisabled}
        aria-checked={checked}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`h-6 w-6 text-white transition-opacity duration-300 transform ${
            checked ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      </button>
      <label
        className={`text-sm font-medium ${isDisabled ? 'text-gray-400' : 'text-gray-900'}`}
        onClick={handleToggle}
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;