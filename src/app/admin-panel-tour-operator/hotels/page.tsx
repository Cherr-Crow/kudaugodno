'use client';

import React, { useMemo } from 'react';

import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';

import { useGetHotelsQuery } from '@/sericesApi/hotelsApi';
import { ContextMenu } from '@/shared/context-menu';
import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { Checkbox } from '@/shared/ui/checkbox';

export default function Hotels() {
  const route = useRouter();
  const { data } = useGetHotelsQuery();

  const workArr = useMemo(() => {
    return data ? [...data.results].sort((a, b) => a.id - b.id) : [];
  }, [data?.results]);

  const handleClick = () => {
    route.push('/admin-panel-tour-operator/hotels/added-hotel');
  };

  const handleItemClick = (action: string) => {
    console.log(action);
  };

  const menuItems = [
    { label: 'Copy', action: () => handleItemClick('Copy') },
    { label: 'Paste', action: () => handleItemClick('Paste') },
    { label: 'Delete', action: () => handleItemClick('Delete') },
  ];

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
          <tr className='bg-blue-50'>
            <th className='p-3 text-start text-blue-400'>№</th>
            <th className='p-3 text-start text-blue-400'>Страна</th>
            <th className='p-3 text-start text-blue-400'>Город</th>
            <th className='p-3 text-start text-blue-400'>Отель</th>
            <th className='p-3 text-start text-blue-400'>Ближайшая дата</th>
            <th className='p-3 text-start text-blue-400'>Цена</th>
          </tr>
        </thead>
        <tbody>
          {!!workArr.length &&
            workArr.map((item, i) => (
              <tr
                className='cursor-pointer border-b border-grey-100 hover:bg-grey-100'
                key={nanoid()}
              >
                <td className='p-3 text-start'>{item.id}</td>
                <td className='p-3 text-start'>{item.country}</td>
                <td className='p-3 text-start'>{item.city}</td>
                <td className='p-3 text-start'>{item.name}</td>
                <td className='p-3 text-start'>надо подумать над полем</td>
                <td className='p-3 text-start'>(минимум за номер?) ₽</td>
              </tr>
            ))}
        </tbody>
      </table>
      <ContextMenu items={menuItems} />
    </div>
  );
}
