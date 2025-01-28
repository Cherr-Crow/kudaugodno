import React from 'react';

import { PopupWindow } from '@/shared/popup-window';
import { Typography } from '@/shared/typography';
import { AddedButton } from '@/shared/ui/added-button';
import { Checkbox } from '@/shared/ui/checkbox';
import { Select } from '@/shared/ui/select';

const typeOfFood = ['Завтрак', 'Обед', 'Ужин'];

export default function Food() {
  return (
    <div className='flex flex-col'>
      <Typography children='Питание' variant='h4' />
      <Checkbox label='Доступно бронирование без питания' className='mb-6 mt-10' />
      <PopupWindow className='relative w-full p-10'>
        <div className='w-full'>
          <Typography children='Тип питания' variant='l-bold' />
          <Select
            options={typeOfFood}
            color='blue'
            size='small'
            className='w-full'
          />
        </div>
        <div className='my-5'>
          <Typography children='Стоимость, сутки' variant='l-bold' />
          <div className='p w-full rounded-md border border-grey-600 p-3'>
            2 000 ₽
          </div>
        </div>
        <AddedButton text='Добавить тип питания' />
      </PopupWindow>
    </div>
  );
}
