'use client';

import React, { useEffect, useRef, useState } from 'react';

import { createPortal } from 'react-dom';

import { PopupWindow } from '@/shared/popup-window';

import { IModal } from './Modal.types';

export function Modal({ children, close }: IModal) {
  const modalRef = document.querySelector('#modal');
  const [isOpen, setIsOpen] = useState(true);
  const window = useRef<HTMLDivElement>(null);

  const closed = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === window.current) setIsOpen(false);
    console.log(e.target == window.current);
  };

  useEffect(() => {
    close && close(isOpen);
  }, [isOpen]);

  return modalRef
    ? createPortal(
        <div
          className='fixed left-0 top-0 h-full w-full bg-grey-opacity'
          onClick={(e) => closed(e)}
          ref={window}
        >
          <PopupWindow className='left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-10'>
            {children}
          </PopupWindow>
        </div>,
        modalRef,
      )
    : null;
}
