'use client';

import React, { useState, useEffect } from 'react';

import { IRadioButton } from './RadioButton.types';

const RadioButton: React.FC<IRadioButton> = ({
  label = '',
  isSelected = false,
  isDisabled = false,
  onChange = () => {},
}) => {
  const [selected, setSelected] = useState(isSelected);

  useEffect(() => {
    if (isSelected !== undefined) {
      setSelected(isSelected);
    }
  }, [isSelected]);

  const handleToggle = (e: React.MouseEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (isDisabled) return;
    if (!selected) {
      setSelected(true);
      onChange(true);
    }
  };

  const buttonId = `radio-button-${label.replace(/\s+/g, '-')}`;

  return (
    <label
      className='flex cursor-pointer items-center space-x-2'
      onClick={handleToggle}
    >
      <button
        id={buttonId}
        type='button'
        className={`bg-gray-100 flex h-6 w-6 items-center justify-center rounded-full border transition-colors duration-300 ${
          isDisabled
            ? 'cursor-not-allowed'
            : selected
              ? 'border-blue-600'
              : 'border-grey-600'
        } ${!isDisabled && 'focus:outline-2 focus:outline-blue-600'}`}
        disabled={isDisabled}
        aria-checked={selected}
        role='radio'
      >
        <span
          className={`h-3 w-3 transform rounded-full bg-blue-600 transition-transform duration-300 ${
            selected ? 'scale-100' : 'scale-0'
          }`}
        />
      </button>
      <span className='text-sm font-medium'>{label}</span>
    </label>
  );
};

export default RadioButton;
