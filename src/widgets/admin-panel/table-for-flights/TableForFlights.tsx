import React, { useState } from 'react';

import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';

import { useDeleteFlightMutation } from '@/servicesApi/flightsApi';
import { ContextMenu } from '@/shared/ui/context-menu';
import { formatToDisplay } from '@/shared/ui/search-block/input-date-for-search-block/InputDateForSearchBlock';

import { ITableForFlights } from './TableForFlights.types';

export function TableForFlights({ flights }: ITableForFlights) {
  const route = useRouter();
  const [deleteFlight] = useDeleteFlightMutation();

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
        activeItem && deleteFlight(activeItem);
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
          {flights.map((flight) => (
            <tr
              className='border-b border-b-grey-100 even:bg-grey-50 hover:bg-blue-50'
              key={nanoid()}
              onContextMenu={(event) => handleContextMenu(event, flight.id)}
            >
              <td className='py-1 pl-2'>{flight.flight_number}</td>
              <td>{flight.departure_airport}</td>
              <td>{flight.arrival_airport}</td>
              <td>{flight.airline}</td>
              <td className=''>{formatToDisplay(flight.departure_date)}</td>
              <td>{formatToDisplay(flight.arrival_date)}</td>
              <td className='pr-2'>{parseInt(flight.price)} ₽</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ContextMenu items={menuItems} visible={isVisible} positionProp={position} />
    </>
  );
}
