import React, { useCallback, useMemo, useState } from 'react';

import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';

import { useDeleteFlightMutation } from '@/servicesApi/flightsApi';
import { FilterAdmin } from '@/shared/filter-admin';
import { ContextMenu } from '@/shared/ui/context-menu';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { isoToDateFormat } from '@/shared/utils/isoToDateFormat';

import {
  IContextMenuState,
  IFilterField,
  IFilters,
  ISortField,
  ISortingState,
  ITableForFlights,
} from './TableForFlights.types';

export function TableForFlights({ flights }: ITableForFlights) {
  const router = useRouter();
  const [deleteFlight] = useDeleteFlightMutation();

  const [contextMenu, setContextMenu] = useState<IContextMenuState>({
    isVisible: false,
    position: { x: 0, y: 0 },
    activeItem: null,
  });

  const [sorting, setSorting] = useState<ISortingState>({
    field: null,
    order: 'asc',
  });

  const [filtering, setFiltering] = useState<{
    filters: IFilters;
    activeField: IFilterField | null;
    isVisible: boolean;
  }>({
    filters: {
      airline: [],
      departure_country: [],
      arrival_country: [],
    },
    activeField: null,
    isVisible: false,
  });

  const menuItems = [
    { label: 'Редактировать', action: () => handleItemClick('Редактировать') },
    { label: 'В архив', action: () => handleItemClick('В архив') },
    { label: 'Удалить', action: () => handleItemClick('Удалить') },
  ];

  const handleContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number,
  ) => {
    event.preventDefault();
    setContextMenu({
      isVisible: true,
      position: { x: event.pageX, y: event.pageY },
      activeItem: id,
    });
  };

  const handleItemClick = (action: string) => {
    if (!contextMenu.activeItem) return;

    switch (action) {
      case 'Редактировать':
        router.push(
          `/admin-panel-tour-operator/flights/added-flights/?id=${contextMenu.activeItem}`,
        );
        break;
      case 'Удалить':
        deleteFlight(contextMenu.activeItem).catch(console.error);
        break;
      default:
        break;
    }
    setContextMenu((prev) => ({ ...prev, isVisible: false }));
  };

  const handleSort = (field: ISortField) => {
    setSorting((prev) => ({
      field,
      order: prev.field === field ? (prev.order === 'asc' ? 'desc' : 'asc') : 'asc',
    }));
  };

  const handleFilterChange = useCallback((key: IFilterField, values: string[]) => {
    setFiltering((prev) => ({
      ...prev,
      filters: { ...prev.filters, [key]: values },
    }));
  }, []);

  const handleFilterClick = useCallback((field: IFilterField) => {
    setFiltering((prev) => ({
      ...prev,
      activeField: field,
      isVisible: true,
    }));
  }, []);

  const handleCloseFilter = useCallback(() => {
    setFiltering((prev) => ({ ...prev, isVisible: false }));
  }, []);

  const filteredFlights = useMemo(() => {
    return flights.filter((flight) =>
      Object.entries(filtering.filters).every(([key, values]) => {
        return (
          values.length === 0 || values.includes(flight[key as keyof typeof flight])
        );
      }),
    );
  }, [flights, filtering.filters]);

  const sortedFlights = useMemo(() => {
    if (!sorting.field) return filteredFlights;

    return [...filteredFlights].sort((a, b) => {
      if (sorting.field === 'departure_date') {
        const aDate = new Date(a.departure_date);
        const bDate = new Date(b.departure_date);
        return sorting.order === 'asc'
          ? aDate.getTime() - bDate.getTime()
          : bDate.getTime() - aDate.getTime();
      } else {
        const aValue = a.airline.toLowerCase();
        const bValue = b.airline.toLowerCase();
        return sorting.order === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
    });
  }, [filteredFlights, sorting.field, sorting.order]);

  const renderFilterButton = (
    field: IFilterField,
    label: string,
    sortable?: boolean,
  ) => (
    <th className='relative text-start text-blue-400'>
      <div className='flex items-center gap-1'>
        {label}
        <button onClick={() => handleFilterClick(field)}>
          <SvgSprite name='filter' color='#7E9CFB' />
        </button>
        {sortable && (
          <button onClick={() => handleSort(field as ISortField)}>
            <SvgSprite name='sort' width={24} color='#7E9CFB' />
          </button>
        )}
        {filtering.isVisible && filtering.activeField === field && (
          <div className='absolute left-0 top-full mt-1'>
            <FilterAdmin
              flights={flights}
              filterField={field}
              onClose={handleCloseFilter}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}
      </div>
    </th>
  );
  const handleFlights = (id: number) => {
    router.push(`/admin-panel-tour-operator/flights/${id}`);
  };

  return (
    <div>
      <table className='w-full'>
        <thead className='bg-blue-50'>
          <tr className='border-b border-b-grey-100'>
            <th className='py-1 pl-2 text-start text-blue-400'>№</th>
            {renderFilterButton('departure_country', 'Вылет')}
            {renderFilterButton('arrival_country', 'Прилет')}
            {renderFilterButton('airline', 'Авиакомпания', true)}
            <th className='text-start text-blue-400'>
              Дата вылета
              <button
                className='pl-1 align-middle'
                onClick={() => handleSort('departure_date')}
              >
                <SvgSprite name='sort' width={24} color='#7E9CFB' />
              </button>
            </th>
            <th className='text-start text-blue-400'>Дата прилета</th>
            <th className='pr-2 text-start text-blue-400'>Цена</th>
          </tr>
        </thead>
        <tbody>
          {sortedFlights.map((flight) => (
            <tr
              className='border-b border-b-grey-100 even:bg-grey-50 hover:bg-blue-50'
              key={nanoid()}
              onContextMenu={(event) => handleContextMenu(event, flight.id)}
              onClick={() => handleFlights(flight.id)}
            >
              <td className='py-1 pl-2'>{flight.flight_number}</td>
              <td>{flight.departure_country}</td>
              <td>{flight.arrival_country}</td>
              <td>{flight.airline}</td>
              <td>{isoToDateFormat(flight.departure_date)}</td>
              <td>{isoToDateFormat(flight.arrival_date)}</td>
              <td className='pr-2'>
                {parseInt(flight.price).toLocaleString('ru-RU')} ₽
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ContextMenu
        items={menuItems}
        visible={contextMenu.isVisible}
        positionProp={contextMenu.position}
      />
    </div>
  );
}
