'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { Checkbox } from '@/shared/ui/checkbox';

export default function Hotels() {
  const route = useRouter();

  const handleClick = () => {
    route.push('/admin-panel-tour-operator/hotels/added-hotel');
  };

  return (
    <div className='w-full'>
      <div className='flex w-full justify-between'>
        <form
          action=''
          className='flex w-3/4 gap-3 rounded-lg border border-grey-100 p-2'
        >
          <SvgSprite name='search' width={24} />
          <input
            type='text'
            className='w-full outline-none'
            placeholder='Введите идентификатор отеля, название отеля или страну'
          />
        </form>
        <ButtonCustom variant='secondary' size='m' onClick={handleClick}>
          <Typography children='Добавить отель' className='text-nowrap' />
        </ButtonCustom>
      </div>
      <Checkbox label='Показать архивные отели' className='my-5' />
      <table className='w-full'>
        <thead>
          <tr className='bg-blue-disabled'>
            <th className='p-3 text-start text-blue-primary'>№</th>
            <th className='p-3 text-start text-blue-primary'>Страна</th>
            <th className='p-3 text-start text-blue-primary'>Город</th>
            <th className='p-3 text-start text-blue-primary'>Отель</th>
            <th className='p-3 text-start text-blue-primary'>Ближайшая дата</th>
            <th className='p-3 text-start text-blue-primary'>Цена</th>
          </tr>
        </thead>
        <tbody>
          <tr className='cursor-pointer border-b border-grey-100 hover:bg-grey-100'>
            <td className='p-3 text-start'>12345</td>
            <td className='p-3 text-start'>Турция</td>
            <td className='p-3 text-start'>Стамбул</td>
            <td className='p-3 text-start'>The Wests Hotel & Spa</td>
            <td className='p-3 text-start'>15.12.2024</td>
            <td className='p-3 text-start'>от 120 000 ₽</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
