import React, { useState, useEffect } from 'react';

import { Typography } from '@/shared/typography';

import { IHotelBookingModalConfirm } from './HotelBookingModalConfirm.types';
import { ButtonCustom } from '../ui/button-custom';

export const HotelBookingModalConfirm: React.FC<IHotelBookingModalConfirm> = ({
  isOpen,
  onClose,
}) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let overlay: HTMLDivElement | null = null;
    if (isOpen) {
      setShowModal(true);
      overlay = document.createElement('div');
      overlay.id = 'modal-overlay';
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      overlay.style.zIndex = '40';
      overlay.style.pointerEvents = 'none';
      overlay.style.transition = 'background-color 0.3s ease-in-out';
      document.documentElement.appendChild(overlay);
      requestAnimationFrame(() => {
        if (overlay) overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      });
    } else {
      const timeout = setTimeout(() => setShowModal(false), 300);
      return () => clearTimeout(timeout);
    }

    return () => {
      if (overlay) {
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        setTimeout(() => {
          if (overlay && overlay.parentElement) {
            overlay.parentElement.removeChild(overlay);
          }
        }, 300);
      }
    };
  }, [isOpen]);

  if (!showModal) return null;

  return (
    <>
      <div className='fixed inset-0 z-50 flex flex-col items-center justify-center'>
        <div
          className={`relative h-[30%] w-[60%] transform overflow-hidden rounded-lg bg-blue-100 p-6 shadow-lg transition-all duration-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <img
            src='plain.svg'
            alt='plain'
            className='absolute -left-[50px] top-1/4 w-[25%] opacity-20'
          />
          <div className='flex flex-col justify-center gap-4 align-middle'>
            <button className='absolute right-3 top-3 text-xl' onClick={onClose}>
              &times;
            </button>
            <Typography variant='l' className='text-center font-bold'>
              Бронирование успешно завершено
            </Typography>
            <Typography variant='m' className='text-gray-700 text-center'>
              Подтверждение бронирования отправлено на почту example@gmail.com
            </Typography>
            <div className='mt-4 flex justify-center'>
              <ButtonCustom
                variant='primary'
                className='hover:bg-lime-500 h-[10%] w-[50%] rounded-full bg-white py-3 text-sm font-bold text-grey-950 shadow-md'
                size={'s'}
                onClick={onClose}
              >
                Посмотреть бронирование
              </ButtonCustom>
            </div>
            <div className='flex justify-center'>
              <img src='happy_jumping_frog.png' alt='happy_jumping_frog' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
