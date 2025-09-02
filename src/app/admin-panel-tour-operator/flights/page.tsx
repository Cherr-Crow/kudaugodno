'use client';

import React from 'react';

import { useGetFlightsQuery } from '@/servicesApi/flightsApi';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { TableForFlights } from '@/widgets/admin-panel/table-for-flights';

export default function Flights() {
  const { data } = useGetFlightsQuery({});
  const flights = data?.results;

  return (
    <div className='flex h-full w-full flex-col gap-10'>
      <div className='flex w-full justify-between'>
        <form
          action=''
          className='flex w-3/4 gap-3 rounded-lg border border-grey-100 p-2'
        >
          <SvgSprite name='search' width={24} />
          <input
            type='text'
            className='w-full outline-none'
            placeholder='Введите номер рейса, название авиакомпании или страну'
          />
        </form>
      </div>

      {flights && <TableForFlights flights={flights} />}
    </div>
  );
}
