'use client';

import React, { useEffect, useRef, useState } from 'react';

import { createPortal } from 'react-dom';

import { PopupWindow } from '@/shared/popup-window';

import { IModal } from './Modal.types';
import { SvgSprite } from '../svg-sprite';

export function Modal({ children, isOpen, getState }: IModal) {
  const modalRef = document.querySelector('#modal');
  const [open, setOpen] = useState(isOpen);
  const window = useRef<HTMLDivElement>(null);
  const popap = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    getState(false);
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  if (!open) return null;

  return modalRef
    ? createPortal(
        <div
          className='fixed left-0 top-0 h-full w-full bg-grey-opacity'
          ref={window}
        >
          <PopupWindow
            className='relative left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-10'
            ref={popap}
          >
            <SvgSprite
              name='cross'
              width={16}
              className='absolute right-4 top-4 cursor-pointer'
              color='#888'
              onClick={handleClose}
            />
            {children}
          </PopupWindow>
        </div>,
        modalRef,
      )
    : null;
}
