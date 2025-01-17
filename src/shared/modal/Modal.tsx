import React from 'react';
import { IModal } from './Modal.types';
import { PopupWindow } from '@/shared/popup-window';

export function Modal({ children }: IModal) {
  return (
    <div>
      <PopupWindow className=''>{children}</PopupWindow>;
    </div>
  );
}
