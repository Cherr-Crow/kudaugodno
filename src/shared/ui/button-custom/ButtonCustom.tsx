import React from 'react';

import { IButtonCustom } from './ButtonCustom.types';

export function ButtonCustom({
  type,
  variant,
  size,
  disabled,
  children,
  style,
  className,
  onClick,
}: IButtonCustom) {
  enum variants {
    primary = 'border-2 border-green-300 bg-green-300 hover:bg-green-200 hover:border-green-200 active:bg-green-500 active:border-green-500',
    secondary = 'border-2 border-green-300 hover:border-green-200 active:border-green-500',
    tetriary = 'bg-blue-200 hover:bg-blue-100 active:bg-blue-400',
    danger = 'bg-red-primary-400  active:bg-red-primary-800',
    wzhuh = 'bg-blue-600 hover:bg-blue-500 active:bg-blue-700',
  }

  enum sizes {
    l = 'py-5',
    m = 'py-3',
    s = 'py-2',
  }
  return (
    <button
      type={type}
      style={style}
      className={`${variants[variant]} ${sizes[size]} ${disabled && 'pointer-events-none opacity-20'} h-fit w-fit rounded-full px-7 hover:shadow-lg ${className ?? ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
