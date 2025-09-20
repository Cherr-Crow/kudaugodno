'use client';

import React, { useEffect, useState } from 'react';

import { useMask } from '@react-input/mask';

import { Typography } from '@/shared/ui/typography';

import { INamedInput } from './NamedInput.types';

export function NamedInput(props: INamedInput) {
  const phoneRef = useMask({
    mask: '+7 (___) ___-__-__',
    replacement: { _: /\d/ },
  });
  const dateRef = useMask({
    mask: '__.__.____',
    replacement: { _: /\d/ },
  });
  const {
    title,
    placeholder,
    name,
    getValue,
    className,
    gap = 'gap-3',
    paddings,
    border,
    type = 'text',
    startValue,
    disabled,
    onChange,
    maskDate,
  } = props;
  const [value, setValue] = useState(startValue ?? '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    setValue(event.target.value);
    onChange?.(event);
  };

  const handlePushValue = () => {
    if (!getValue) return;
    getValue(type === 'number' ? +value : value);
  };

  useEffect(() => {
    if (!startValue) return;
    setValue(startValue);
  }, [startValue]);

  return (
    <div
      className={`flex w-full flex-col ${gap} ${className ?? ''}`}
      onBlur={handlePushValue}
    >
      {title && <Typography variant='l-bold'>{title}</Typography>}
      <input
        {...(type === 'tel' && { ref: phoneRef })}
        {...(maskDate && { ref: dateRef })}
        type={type}
        className={`w-full rounded-md border ${border ?? 'border-blue-600'} ${paddings ?? 'px-4 py-2'} focus:outline-none focus:ring-1 focus:ring-blue-500`}
        placeholder={placeholder ?? ''}
        value={disabled ? startValue : value}
        onChange={handleChange}
        name={name}
        autoComplete='on'
      />
    </div>
  );
}
