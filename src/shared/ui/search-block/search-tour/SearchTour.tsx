import React, { useRef } from 'react';

import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { InputDateForSearchBlock } from '@/shared/ui/search-block/input-date-for-search-block';
import { InputForSearchBlock } from '@/shared/ui/search-block/input-for-search-block';

import { ISearchTour } from './SearchTour.types';
import { SelectForSearchBlock } from '@/shared/select-for-search-block';

export function SearchTour({}: ISearchTour) {
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
    <div className='flex h-full w-full max-w-[800px] gap-2 rounded-full bg-white py-1 pl-12 pr-1'>
      <InputForSearchBlock
        placeholder='Город вылета'
        getValue={handleSetDepartureCity}
        className='border-r-2 border-grey-400'
      />
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
  );
}
