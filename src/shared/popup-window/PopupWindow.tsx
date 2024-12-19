

import React, { forwardRef } from 'react';
import { IPopupWindow } from './PopupWindow.types';


export const PopupWindow = forwardRef<HTMLDivElement, IPopupWindow>(
  ({ className, children }, ref) => {
    return (
      <div
        ref={ref} 
        className={`${className} absolute w-fit rounded-2xl bg-white shadow-xl`}
        data-testid='pop-up-window'
      >
        {children}
      </div>
    );
  }
);


PopupWindow.displayName = "PopupWindow";

