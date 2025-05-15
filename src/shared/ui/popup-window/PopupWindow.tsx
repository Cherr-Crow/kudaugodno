'use client';
import React from 'react';

import { IPopupWindow } from './PopupWindow.types';

export const PopupWindow: React.FC<IPopupWindow> = ({
  className,
  children,
  ref,
}) => {
  return (
    <div
      ref={ref}
      className={`absolute z-10 w-fit rounded-2xl bg-white shadow-xl ${className}`}
      data-testid='pop-up-window'
    >
      {children}
    </div>
  );
};
