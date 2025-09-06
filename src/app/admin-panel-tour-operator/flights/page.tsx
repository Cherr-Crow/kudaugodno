'use client';

import React, { useState } from 'react';

import { useGetFlightsQuery } from '@/servicesApi/flightsApi';
import { Pagination } from '@/shared/pagination';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { TableForFlights } from '@/widgets/admin-panel/table-for-flights';

export default function Flights() {
  const router = useRouter();
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const { data } = useGetFlightsQuery({ limit, offset });
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

      {data && (
        <div className='flex justify-center pt-8'>
          <Pagination
            totalItems={data?.count ?? 0}
            pageSize={limit}
            onChange={(newOffset, newLimit) => {
              setOffset(newOffset);
              setLimit(newLimit);
            }}
          />
        </div>
      )}
    </div>
  );
}
