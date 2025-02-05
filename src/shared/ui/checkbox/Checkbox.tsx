'use client';

import React, { useState, useEffect } from 'react';

import { SvgSprite } from '@/shared/svg-sprite';

import { ICheckbox } from './Checkbox.types';

const Checkbox: React.FC<ICheckbox> = ({
  label,
  isChecked,
  isDisabled,
  onChange,
  className,
}) => {
  const [checked, setChecked] = useState(isChecked ?? false);

  useEffect(() => {
    if (isChecked !== undefined) {
      setChecked(isChecked);
    }
  }, [isChecked]);

  const handleToggle = () => {
    if (isDisabled) return;
    const newChecked = !checked;
    setChecked(newChecked);
    onChange && onChange(newChecked);
  };

  return (
    <div
      className={`flex items-center space-x-2 ${className}`}
      onClick={handleToggle}
    >
      <button
        role='switch'
        className={`flex h-6 w-6 items-center justify-center rounded-lg border border-grey-600 transition-colors duration-300 ${
          isDisabled
            ? 'cursor-not-allowed bg-grey-100'
            : checked
              ? 'border-0 bg-blue-600'
              : 'bg-grey-100'
        } ${!isDisabled && 'focus:outline-2 focus:outline-blue-600'}`}
        disabled={isDisabled}
        aria-checked={checked}
      >
        {checked && <SvgSprite name='arrow-check'/>}
      </button>
      <div
        className={`cursor-pointer text-sm font-medium ${
          isDisabled ? 'text-gray-400' : 'text-gray-900'
        }`}
      >
        {label ?? ''}
      </div>
    </div>
  );
};

export default Checkbox;
