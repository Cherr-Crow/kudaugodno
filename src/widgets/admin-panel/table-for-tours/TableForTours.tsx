import React, { useState, useMemo } from 'react';

import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';

import { useDeleteTourMutation, usePatchTourMutation } from '@/servicesApi/toursApi';
import { ContextMenu } from '@/shared/ui/context-menu';
import { SvgSprite } from '@/shared/ui/svg-sprite';

import { ITableForTours } from './TableForTours.types';

export function TableForTours({ tours }: ITableForTours) {
  const route = useRouter();
  const [deleteTour] = useDeleteTourMutation();
  const [patchTour] = usePatchTourMutation();
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [sortField, setSortField] = useState<
    'arrival_country' | 'arrival_city' | 'hotel' | 'start_date' | null
  >(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [activeTour, setActiveTour] = useState<(typeof tours)[number] | null>(null);

  const handleContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number,
  ) => {
    event.preventDefault();
    setIsVisible(true);
    setPosition({ x: event.pageX, y: event.pageY });
    setActiveItem(id);
    const tour = tours.find((tour) => tour.id === id) || null;
    setActiveTour(tour);
  };

  const menuItems = [
    { label: 'Редактировать', action: () => handleItemClick('Редактировать') },
    {
      label: activeTour?.is_active === false ? 'Убрать из архива' : 'В архив',
      action: () => handleItemClick('Архив'),
    },
    { label: 'Удалить', action: () => handleItemClick('Удалить') },
  ];

  const handleItemClick = (action: string) => {
    switch (action) {
      case 'Редактировать':
        route.push(`/${activeItem ? '?id=' + activeItem : ''}`);
        break;
      case 'Архив':
        if (activeItem && activeTour) {
          patchTour({ id: activeItem, body: { is_active: !activeTour.is_active } });
        }
        break;
      case 'Удалить':
        activeItem && deleteTour(activeItem);
        break;
      default:
        return;
    }
  };

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedTours = useMemo(() => {
    if (!sortField) return tours;
    return [...tours].sort((a, b) => {
      if (sortField === 'start_date') {
        const aDate = new Date(a.start_date);
        const bDate = new Date(b.start_date);
        return sortOrder === 'asc'
          ? aDate.getTime() - bDate.getTime()
          : bDate.getTime() - aDate.getTime();
      }

      const aValue = String(a[sortField] ?? '').toLowerCase();
      const bValue = String(b[sortField] ?? '').toLowerCase();
      return sortOrder === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }, [tours, sortField, sortOrder]);

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}.${month}.${year}`;
  };

  return (
    <div className='w-full overflow-x-auto'>
      <table className='w-full table-auto border-collapse'>
        <thead className='bg-blue-50'>
          <tr className='h-12 text-base text-blue-400'>
            <th className='w-11 text-[12px] sm:text-[12px] md:text-base'>№</th>
            <th className='w-[140px] pl-3 text-left text-[12px] sm:text-[12px] md:text-base'>
              Страна
              <button
                className='pl-1 align-middle'
                onClick={() => handleSort('arrival_country')}
              >
                <SvgSprite name='filter' width={24} color='#7E9CFB' />
              </button>
            </th>
            <th className='w-[133px] pl-3 text-left text-[12px] sm:text-[12px] md:text-base'>
              Город
              <button
                className='pl-1 align-middle'
                onClick={() => handleSort('arrival_city')}
              >
                <SvgSprite name='filter' width={24} color='#7E9CFB' />
              </button>
            </th>
            <th className='w-[260px] pl-3 text-left text-[12px] sm:text-[12px] md:text-base'>
              Отель
              <button
                className='pl-1 align-middle'
                onClick={() => handleSort('hotel')}
              >
                <SvgSprite name='filter' width={24} color='#7E9CFB' />
              </button>
            </th>
            <th className='w-[212px] pl-3 text-left text-[12px] sm:text-[12px] md:text-base'>
              Рейсы
            </th>
            <th className='w-48 pl-3 text-left text-[12px] sm:text-[12px] md:text-base'>
              Дата пребывания
              <button
                className='pl-1 align-middle'
                onClick={() => handleSort('start_date')}
              >
                <SvgSprite name='sort' width={24} color='#7E9CFB' />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTours.map((tour) => (
            <tr
              className='border-b border-b-grey-100 align-top text-base text-grey-950 even:bg-grey-50 hover:bg-blue-50'
              key={nanoid()}
              onContextMenu={(event) => handleContextMenu(event, tour.id)}
            >
              <td className='pl-3 pt-3 text-left text-[12px] sm:text-[12px] md:text-base'>
                {tour.id}
              </td>
              <td className='pl-3 pt-3 text-left text-[12px] sm:text-[12px] md:text-base'>
                {tour.arrival_country}
              </td>
              <td className='pl-3 pt-3 text-left text-[12px] sm:text-[12px] md:text-base'>
                {tour.arrival_city}
              </td>
              <td className='pl-3 pt-3 text-left text-[12px] sm:text-[12px] md:text-base'>
                {tour.hotel.name}
              </td>
              <td className='pl-3 pt-3 text-left text-[12px] sm:text-[12px] md:text-base'>
                <span className='font-bold'>
                  {tour.flight_to.split(' ').slice(0, 2).join(' ')}
                </span>
                {tour.flight_to.split(' ').slice(2).join(' ')} - {tour.flight_from}
              </td>
              <td className='pl-3 pt-3 text-left text-[12px] sm:text-[12px] md:text-base'>
                {`${formatDate(tour.start_date)} - ${formatDate(tour.end_date)}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ContextMenu items={menuItems} visible={isVisible} positionProp={position} />
    </div>
  );
}
