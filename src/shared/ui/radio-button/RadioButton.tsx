'use client';

import React, { useState } from 'react';

import { IRadioButton } from './RadioButton.types';

const RadioButton: React.FC<IRadioButton> = ({
  label = '',
  isSelected = false,
  isDisabled = false,
  onChange = () => {},
}) => {
  const [selected, setSelected] = useState(isSelected);

  const handleToggle = () => {
    if (isDisabled) return;
    setSelected(!selected);
    onChange(!selected);
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        className={`h-6 w-6 flex items-center justify-center rounded-full bg-gray-100 border border-1 border-grey-600 transition-colors duration-300
          ${isDisabled ? 'cursor-not-allowed' : selected ? 'border-1 border-blue-600' : 'border-1 border-grey-600'}
          ${!isDisabled && 'focus:outline-2 focus:outline-blue-600 '}
        `}
        onClick={handleToggle}
        disabled={isDisabled}
        aria-checked={selected}
      >
        <span
          className={`h-3 w-3 rounded-full bg-blue-600 transform scale-0 transition-transform duration-300
            ${selected ? 'scale-100' : ''}
          `}
        />
      </button>
      <label
        className={`text-sm font-medium`}
        onClick={handleToggle}
      >
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
