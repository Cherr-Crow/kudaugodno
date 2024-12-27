import React from 'react';
import { IAddedHotelField } from './AddedHotelField.types';
import { Typography } from '@/shared/typography';
import { Select } from '@/shared/ui/select';

const typeOfHoliday = ['Пляжный', 'Городской'];

export function AddedHotelField({}: IAddedHotelField) {
  return (
    <section className=''>
      <div className=''>
        <Typography children='Тип отдыха' variant='l-bold' />
        <Select options={typeOfHoliday} color='blue' size='small' />
      </div>
    </section>
  );
}
