'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

import { IFilterField } from '@/widgets/admin-panel/table-for-flights/TableForFlights.types';

import { IFilterAdminProps } from './FilterAdmin.types';

export const FilterAdmin = ({
  flights,
  filterField,
  onClose,
  onFilterChange,
}: IFilterAdminProps) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const filterRef = useRef<HTMLDivElement>(null);

  const uniqueValues = useMemo(
    () => [
      ...new Set(
        flights
          .map((flight) => flight[filterField])
          .filter((value): value is string => Boolean(value)),
      ),
    ],
    [flights, filterField],
  );

  const handleToggleFilter = (value: string) => {
    setSelectedFilters((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    onFilterChange(filterField, selectedFilters);
  }, [selectedFilters, filterField, onFilterChange]);

  const filterTitles: Record<IFilterField, string> = {
    departure_country: 'Страна вылета',
    arrival_country: 'Страна прилета',
    airline: 'Авиакомпания',
  };

  const getFilterTitle = () => filterTitles[filterField] ?? '';

  return (
    <div
      ref={filterRef}
      className='absolute left-0 top-0 z-50 w-96 rounded-xl border border-grey-100 bg-white p-4 text-grey-950 shadow-xl'
    >
      <div className='mb-3 flex items-center justify-between'>
        <h3 className='text-lg font-bold'>{getFilterTitle()}</h3>
        <button onClick={onClose} className='text-grey-500 hover:text-grey-700'>
          ✕
        </button>
      </div>

      <div className='flex flex-col gap-2'>
        {uniqueValues.map((value) => (
          <label
            key={value}
            className='flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-grey-50'
          >
            <input
              type='checkbox'
              checked={selectedFilters.includes(value)}
              onChange={() => handleToggleFilter(value)}
              className='h-4 w-4 rounded text-blue-600'
            />
            <span>{value}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
