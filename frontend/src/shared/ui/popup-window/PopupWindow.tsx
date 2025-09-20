'use client';
import React, { useEffect, useRef } from 'react';

import { IPopupWindow } from './PopupWindow.types';

export const PopupWindow: React.FC<IPopupWindow> = ({
  className,
  children,
  onClose,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose?.();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={popupRef}
      className={`${className} absolute z-20 w-fit rounded-2xl bg-white shadow-xl`}
      data-testid='pop-up-window'
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};
