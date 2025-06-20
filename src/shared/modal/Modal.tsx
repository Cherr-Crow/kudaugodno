'use client';

import React, { useEffect, useRef, useState } from 'react';

import { createPortal } from 'react-dom';

import { PopupWindow } from '@/shared/ui/popup-window';

import { IModal } from './Modal.types';
import { SvgSprite } from '../ui/svg-sprite';

export function Modal({
  children,
  isOpen,
  getState,
  err = false,
  isNewVariation,
  hasScrollbar,
  auth,
}: IModal) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(isOpen);
  const window = useRef<HTMLDivElement>(null);
  const popap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    modalRef.current = document.querySelector('#modal');
  }, []);

  const handleClose = () => {
    getState(false);
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  const PopupContent = (
    <>
      <SvgSprite
        name='cross'
        width={16}
        className={`absolute ${isNewVariation ? 'right-5 top-6 lg:right-10 lg:top-10 lg:w-6' : 'right-4 top-4'} ${auth ? `right-[20px] top-[20px] md:right-[31px] md:top-[31px] md:z-[1] lg:right-[31px] lg:top-[31px] lg:h-[15px] lg:w-[15px]` : ''} cursor-pointer`}
        color='#888'
        onClick={handleClose}
      />
      {children}
    </>
  );

  if (!open || !modalRef.current) return null;

  return createPortal(
    <div
      className={`fixed left-0 top-0 z-10 h-full w-full bg-grey-opacity ${isNewVariation ? 'px-3 py-4' : ''}`}
      ref={window}
    >
      <PopupWindow
        className={`relative -translate-x-1/2 ${isNewVariation ? 'left-1/2 z-20 max-h-[calc(100vh-2rem)] min-w-[343px] overflow-y-hidden rounded-[20px]' : 'left-1/2 top-1/2 max-h-[calc(100vh-2rem)] -translate-y-1/2 overflow-y-scroll p-10'} ${err && 'bg-gradient-to-tl from-red-primary-400'} ${auth ? `top-1/2 -translate-y-1/2 rounded-xl md:rounded-[20px]` : ''}`}
        ref={popap}
      >
        {hasScrollbar ? (
          <div
            className={`scrollbar max-h-[calc(100vh-2rem)] overflow-y-auto ${auth ? '' : 'p-5 md:py-9 lg:px-10 lg:py-14'} `}
          >
            {PopupContent}
          </div>
        ) : (
          <>{PopupContent}</>
        )}
      </PopupWindow>
    </div>,
    modalRef.current,
  );
}
