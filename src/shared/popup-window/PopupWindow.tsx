import React from 'react';
import { IPopupWindow } from './PopupWindow.types';

export function PopupWindow({ className, children }: IPopupWindow) {
  return (
    <div
      className={`${className} absolute w-fit rounded-2xl bg-white shadow-xl`}
      data-testid='pop-up-window'
    >
      {children}
    </div>
  );
}
