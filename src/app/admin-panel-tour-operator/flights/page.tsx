'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { useGetFlightsQuery } from '@/servicesApi/flightsApi';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';
import { TableForFlights } from '@/widgets/admin-panel/table-for-flights';

export default function Flights() {
  const router = useRouter();
  const { data } = useGetFlightsQuery({});
  const flights = data?.results;

  const handleRout = () => {
    router.push('/admin-panel-tour-operator/flights/added-flights');
  };

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
        <ButtonCustom variant='secondary' size='m' onClick={handleRout}>
          <Typography className='text-nowrap'>Добавить рейс</Typography>
        </ButtonCustom>
      </div>

      {flights && <TableForFlights flights={flights} />}
    </div>
  );
}
