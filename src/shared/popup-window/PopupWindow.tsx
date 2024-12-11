'use client';

import React from 'react';
import { IPopupWindow } from './PopupWindow.types';

export function PopupWindow({ className, children }: IPopupWindow) {
  return (
    <div
      className={`${className} shadow-lg rounded-2xl w-fit absolute`}
      data-testid='pop-up-window'
    >
      {children}
    </div>
  );
}
