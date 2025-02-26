import React from 'react';

import { IHotelBookingPayForm } from './HotelBookingPayForm.types';
import { Typography } from '../typography';
import { ButtonCustom } from '../ui/button-custom';
import { NamedInput } from '../ui/named-input';

export function HotelBookingPayForm({}: IHotelBookingPayForm) {
  const stayPrice = 22765;
  const taxes = 765;
  const discount = 765;
  const bonuses = 238;
  const totalPrice = stayPrice + taxes - discount;

  return (
    <div className='rounded-lg bg-white p-4 shadow-lg'>
      <div className='mb-4'>
        <Typography variant='l' className='font-bold text-grey-950'>
          Стоимость бронирования
        </Typography>
      </div>

      {/* Детализация цены */}
      <div className='mb-2 flex justify-between'>
        <Typography variant='m' className='text-grey-800'>
          Проживание
        </Typography>
        <Typography variant='m' className='text-grey-800'>
          {stayPrice.toLocaleString()} ₽
        </Typography>
      </div>
      <div className='mb-2 flex justify-between'>
        <Typography variant='m' className='text-grey-800'>
          Налоги и сборы
        </Typography>
        <Typography variant='m' className='text-grey-800'>
          {taxes.toLocaleString()} ₽
        </Typography>
      </div>
      <div className='mb-2 flex justify-between'>
        <Typography variant='m' className='text-grey-800'>
          Скидка
        </Typography>
        <Typography variant='m' className='text-[#FF0202]'>
          -{discount.toLocaleString()} ₽
        </Typography>
      </div>
      <div className='mb-4 flex justify-between'>
        <Typography variant='m' className='text-grey-800'>
          Начислим бонусы
        </Typography>
        <Typography variant='m' className='text-grey-800'>
          {bonuses.toLocaleString()} бонусов
        </Typography>
      </div>

      <div className='mb-4'>
        {/* Поле ввода промокода */}
        <div className='mb-4 flex w-full gap-2'>
          <div className='w-[70%]'>
            <NamedInput
              id='promo'
              name='Введите промокод'
              type='text'
              placeholder='Введите промокод'
            />
          </div>
          <ButtonCustom variant='secondary' className='px-2 lg:px-4' size='s'>
            Применить
          </ButtonCustom>
        </div>

        {/* Итоговая сумма */}
        <div className='border-gray-300 border-t pt-4'>
          <div className='flex justify-between'>
            <Typography variant='l' className='font-bold text-grey-950'>
              Итого
            </Typography>
            <Typography variant='l' className='font-bold text-grey-950'>
              {totalPrice.toLocaleString()} ₽
            </Typography>
          </div>
        </div>
      </div>

      {/* Кнопка завершения бронирования */}
      <div>
        <ButtonCustom
          variant='primary'
          className='bg-lime-400 hover:bg-lime-500 h-[10%] w-full rounded-full py-3 text-sm font-bold text-grey-950 shadow-md'
          size={'s'}
        >
          Завершить бронирование
        </ButtonCustom>
      </div>
    </div>
  );
}
