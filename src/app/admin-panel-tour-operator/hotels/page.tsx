'use client';

import React, { useMemo, useState } from 'react';

import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';

import { useDeleteHotelMutation, useGetHotelsQuery } from '@/servicesApi/hotelsApi';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { Checkbox } from '@/shared/ui/checkbox';
import { ContextMenu } from '@/shared/ui/context-menu';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';

export default function Hotels() {
  const route = useRouter();
  const { data } = useGetHotelsQuery({});
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [activeItem, setActiveItem] = useState(0);
  const [deleteHotel] = useDeleteHotelMutation();

  const workArr = useMemo(() => {
    return data ? [...data.results].sort((a, b) => a.id - b.id) : [];
  }, [data?.results]);

  const handleClick = () => {
    route.push('/admin-panel-tour-operator/hotels/added-hotel');
  };

  const handleContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number,
  ) => {
    event.preventDefault();
    setIsVisible(true);
    setPosition({ x: event.pageX, y: event.pageY });
    setActiveItem(id);
  };

  const menuItems = [
    { label: 'Редактировать', action: () => handleItemClick('Редактировать') },
    { label: 'В архив', action: () => handleItemClick('В архив') },
    { label: 'Удалить', action: () => handleItemClick('Удалить') },
  ];

  const handleItemClick = (action: string) => {
    switch (action) {
      case 'Редактировать':
        route.push(
          `/admin-panel-tour-operator/hotels/change-hotel/?id=${activeItem}`,
        );
        break;
      case 'В архив':
        break;
      case 'Удалить':
        deleteHotel(activeItem);
        break;
      default:
        return;
    }
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
          <Typography className='text-nowrap'>Добавить отель</Typography>
        </ButtonCustom>
      </div>
      <Checkbox label='Показать архивные отели' className='my-5' />
      <table className='max-h-2/3 w-full'>
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
            workArr.map((item) => (
              <tr
                className='cursor-pointer border-b border-grey-100 hover:bg-grey-100'
                key={nanoid()}
                onContextMenu={(event) => handleContextMenu(event, item.id)}
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
      <ContextMenu items={menuItems} visible={isVisible} positionProp={position} />
    </div>
  );
}
