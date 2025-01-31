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
    <div className='flex items-center space-x-2'>
      <button
        className={`bg-gray-100 border-1 flex h-6 w-6 items-center justify-center rounded-full border border-grey-600 transition-colors duration-300 ${isDisabled ? 'cursor-not-allowed' : selected ? 'border-1 border-blue-600' : 'border-1 border-grey-600'} ${!isDisabled && 'focus:outline-2 focus:outline-blue-600'} `}
        onClick={handleToggle}
        disabled={isDisabled}
        aria-checked={selected}
        role='switch'
      >
        <span
          className={`h-3 w-3 scale-0 transform rounded-full bg-blue-600 transition-transform duration-300 ${selected ? 'scale-100' : ''} `}
        />
      </button>
      <label className={`text-sm font-medium`} onClick={handleToggle}>
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
