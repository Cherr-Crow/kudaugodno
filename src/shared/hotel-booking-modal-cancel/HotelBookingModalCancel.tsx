import React, { useState } from 'react';

import { Typography } from '@/shared/typography';

import { IHotelBookingModalCancel } from './HotelBookingModalCancel.types';
import { ButtonCustom } from '../ui/button-custom';

export const HotelBookingModalCancel: React.FC<IHotelBookingModalCancel> = ({
  isOpen,
  onClose,
}) => {
  const [isCancelled, setIsCancelled] = useState(false);

  if (!isOpen) return null;

  return (
    <div className='bg-black fixed inset-0 flex flex-col items-center justify-center bg-opacity-50'>
      <div className='relative h-[30%] w-[60%] overflow-hidden rounded-lg bg-blue-100 p-6 shadow-lg'>
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
              className='hover:bg-lime-500 w-full rounded-full bg-white py-3 text-sm font-bold text-grey-950 shadow-md'
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
          <div className='flex flex-col justify-center gap-4 align-middle'>
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
                className='hover:bg-lime-500 h-[10%] w-full rounded-full bg-white py-3 text-sm font-bold text-grey-950 shadow-md'
                size='s'
                onClick={onClose}
              >
                Не отменять
              </ButtonCustom>

              <ButtonCustom
                variant='primary'
                className='hover:bg-lime-500 bg-lime-400 h-[10%] w-full rounded-full py-3 text-sm font-bold text-grey-950 shadow-md'
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
