import React, { useRef } from 'react';

import { SelectForSearchBlock } from '@/shared/select-for-search-block';
import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { InputDateForSearchBlock } from '@/shared/ui/search-block/input-date-for-search-block';
import { InputForSearchBlock } from '@/shared/ui/search-block/input-for-search-block';

import { ISearchTour } from './SearchTour.types';

export function SearchTour({ type }: ISearchTour) {
  const departureCity = useRef<string>('');
  const where = useRef<string>('');
  const checkInDate = useRef<string>('');
  const checkOutDate = useRef<string>('');

  const handleSetDepartureCity = (event: string) => {
    departureCity.current = event;
  };

  const handleSetWhere = (event: string) => {
    where.current = event;
  };

  const handleSetCheckInDate = (event: string) => {
    checkInDate.current = event;
  };

  const handleSetCheckOutDate = (event: string) => {
    checkOutDate.current = event;
  };

  return (
    <div className='md:flex md:justify-center'>
      <div className='hidden h-full w-full max-w-[800px] gap-2 rounded-full border-solid bg-white py-1 pl-12 pr-1 shadow-lg md:flex md:justify-center'>
        {type === 'Туры' && (
          <InputForSearchBlock
            placeholder='Город вылета'
            getValue={handleSetDepartureCity}
            className='border-r-2 border-grey-400'
          />
        )}
        <InputForSearchBlock
          placeholder='Куда'
          getValue={handleSetWhere}
          className='border-r-2 border-grey-400'
        />
        <InputDateForSearchBlock
          placeholder='Дата заезда'
          className='border-r-2 border-grey-400'
          getValue={handleSetCheckInDate}
        />
        <InputDateForSearchBlock
          placeholder='Дата выезда'
          className='border-r-2 border-grey-400'
          getValue={handleSetCheckOutDate}
        />
        <SelectForSearchBlock />
        <div className='flex items-center'>
          <ButtonCustom
            variant='primary'
            size='m'
            onClick={() =>
              console.log(
                departureCity.current,
                where.current,
                checkInDate.current,
                checkOutDate.current,
              )
            }
          >
            <Typography variant='m-bold'>Найти</Typography>
          </ButtonCustom>
        </div>
      </div>
      <div className='grid w-full grid-cols-2 gap-x-4 gap-y-3 md:hidden'>
        {type === 'Туры' && (
          <InputForSearchBlock
            placeholder='Город вылета'
            getValue={handleSetDepartureCity}
            className='col-span-2 w-full rounded-lg bg-white p-4'
          />
        )}
        <InputForSearchBlock
          placeholder='Куда'
          getValue={handleSetWhere}
          className='col-span-2 w-full rounded-lg bg-white p-4'
        />
        <SelectForSearchBlock className='col-span-2 w-full rounded-lg bg-white px-4' />
        <InputDateForSearchBlock
          placeholder='Дата заезда'
          className='w-full rounded-lg bg-white p-4'
          getValue={handleSetCheckInDate}
        />
        <InputDateForSearchBlock
          placeholder='Дата выезда'
          className='w-full rounded-lg bg-white p-4'
          getValue={handleSetCheckOutDate}
        />
        <ButtonCustom
          variant='primary'
          size='m'
          onClick={() =>
            console.log(
              departureCity.current,
              where.current,
              checkInDate.current,
              checkOutDate.current,
            )
          }
          className='col-span-2 w-full'
        >
          <Typography variant='m-bold'>Найти</Typography>
        </ButtonCustom>
      </div>
    </div>
  );
}
