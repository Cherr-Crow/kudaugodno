"use client"
import React from 'react';
import { IPopupWindow } from './PopupWindow.types';

interface PopupWindowProps extends IPopupWindow {
  ref?: React.Ref<HTMLDivElement>;
}

export const PopupWindow: React.FC<PopupWindowProps> = ({
  className,
  children,
  ref,
}) => {
  return (
    <div
      ref={ref}
      className={`${className} absolute w-fit rounded-2xl bg-white shadow-xl`}
      data-testid='pop-up-window'
    >
      {children}
    </div>
  );
};