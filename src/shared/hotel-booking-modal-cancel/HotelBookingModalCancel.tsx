import React, { useState, useEffect } from 'react';

import { Typography } from '@/shared/typography';

import { IHotelBookingModalCancel } from './HotelBookingModalCancel.types';
import { ButtonCustom } from '../ui/button-custom';

export const HotelBookingModalCancel: React.FC<IHotelBookingModalCancel> = ({
  isOpen,
  onClose,
}) => {
  const [isCancelled, setIsCancelled] = useState(false);
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
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div
        className={`relative h-[30%] w-[60%] rounded-lg bg-blue-100 p-6 shadow-lg transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <button className='absolute right-3 top-3 text-xl' onClick={onClose}>
          &times;
        </button>

        {isCancelled ? (
          <div className='flex flex-col items-center justify-center gap-4'>
            <Typography variant='l' className='text-center font-bold'>
              Бронирование отменено
            </Typography>

            <ButtonCustom
              variant='primary'
              className='w-full rounded-full bg-white py-3 text-sm font-bold text-grey-950 shadow-md'
              size='s'
              onClick={onClose}
            >
              Готово
            </ButtonCustom>

            <div className='flex justify-center'>
              <img src='sad_frog_pulling_a_hat.png' alt='sad_frog_pulling_a_hat' />
            </div>
          </div>
        ) : (
          <div className='flex flex-col justify-center gap-4'>
            <Typography variant='l' className='text-center font-bold'>
              Отмена бронирования
            </Typography>
            <Typography variant='m' className='text-gray-700 text-center'>
              Вы собираетесь отменить бронирование с оплатой напрямую в отель.
              Отмененный заказ не подлежит восстановлению.
            </Typography>

            <div className='flex flex-row justify-center gap-4'>
              <ButtonCustom
                variant='primary'
                className='h-[10%] w-full rounded-full bg-white py-3 text-sm font-bold text-grey-950 shadow-md'
                size='s'
                onClick={onClose}
              >
                Не отменять
              </ButtonCustom>

              <ButtonCustom
                variant='primary'
                className='bg-lime-400 h-[10%] w-full rounded-full py-3 text-sm font-bold text-grey-950 shadow-md'
                size='s'
                onClick={() => setIsCancelled(true)}
              >
                Отменить бронирование
              </ButtonCustom>
            </div>
            <div className='flex justify-center'>
              <img src='sad_frog_pulling_a_hat.png' alt='sad_frog_pulling_a_hat' />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
