import React, { useState } from 'react';

import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';

import { useDeleteTourMutation } from '@/servicesApi/toursApi';
import { ContextMenu } from '@/shared/ui/context-menu';

import { ITableForTours } from './TableForTours.types';

export function TableForTours({ tours }: ITableForTours) {
  const route = useRouter();
  const [deleteTour] = useDeleteTourMutation();

  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [activeItem, setActiveItem] = useState<number | null>(null);

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
          `/admin-panel-tour-operator/flights/added-flights/${activeItem ? '?id=' + activeItem : null}`,
        );
        break;
      case 'В архив':
        break;
      case 'Удалить':
        activeItem && deleteTour(activeItem);
        break;
      default:
        return;
    }
  };

  return (
    <>
      <table className='w-full'>
        <thead className='bg-blue-50'>
          <tr className='border-b border-b-grey-100'>
            <th className='py-1 pl-2 text-start text-blue-400'>№</th>
            <th className='text-start text-blue-400'>Вылет</th>
            <th className='text-start text-blue-400'>Прилет</th>
            <th className='text-start text-blue-400'>Авиакомпания</th>
            <th className='text-start text-blue-400'>Дата вылета</th>
            <th className='text-start text-blue-400'>Дата прилета </th>
            <th className='pr-2 text-start text-blue-400'>Цена</th>
          </tr>
        </thead>
        <tbody>
          {tours.map((tour) => (
            <tr
              className='border-b border-b-grey-100 even:bg-grey-50 hover:bg-blue-50'
              key={nanoid()}
              onContextMenu={(event) => handleContextMenu(event, tour.id)}
            >
              <td className='py-1 pl-2'>{tour.departure_city}</td>
              <td>{tour.hotel}</td>
              <td>{tour.start_date}</td>
              <td>{tour.end_date}</td>
              <td className=''>{tour.number_of_adults}</td>
              <td>{tour.number_of_children}</td>
              <td className='pr-2'>{tour.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ContextMenu items={menuItems} visible={isVisible} positionProp={position} />
    </>
  );
}
