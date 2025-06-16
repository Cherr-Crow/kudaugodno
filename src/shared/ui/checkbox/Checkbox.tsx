'use client';

import React, { useState, useEffect, useId } from 'react';

import { SvgSprite } from '@/shared/ui/svg-sprite';

import { ICheckbox } from './Checkbox.types';

const Checkbox: React.FC<ICheckbox> = ({
  label,
  isChecked,
  isDisabled,
  onChange,
  className,
  id,
}) => {
  const [checked, setChecked] = useState(isChecked ?? false);
  const generatedId = useId();

  useEffect(() => {
    if (isChecked !== undefined) {
      setChecked(isChecked);
    }
  }, [isChecked]);

  const handleToggle = () => {
    if (isDisabled) return;
    const newChecked = !checked;
    setChecked(newChecked);
    if (onChange) onChange(newChecked);
  };

  const checkboxId = id || `checkbox-${generatedId}`;

  return (
    <div
      className={`flex items-center space-x-2 ${className}`}
      onClick={handleToggle}
    >
      <button
        id={checkboxId}
        name={checkboxId}
        type='button'
        role='switch'
        className={`flex h-6 w-6 items-center justify-center rounded-lg border transition-colors duration-300 ${
          isDisabled
            ? 'cursor-not-allowed border-grey-600 bg-grey-100'
            : checked
              ? 'border-0 bg-blue-600 text-white'
              : 'border-grey-600 bg-grey-100'
        } ${!isDisabled && 'focus:outline-2 focus:outline-blue-600'}`}
        disabled={isDisabled}
        aria-checked={checked}
      >
        {checked && <SvgSprite name='arrow-check' />}
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
