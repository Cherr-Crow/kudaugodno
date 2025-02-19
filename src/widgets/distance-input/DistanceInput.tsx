import React, { useEffect, useState } from 'react';

import { Select } from '@/shared/ui/select';

import { IDistanceInput } from './DistanceInput.types';

export function DistanceInput({ options, getDistance, reset }: IDistanceInput) {
  const [distance, setDistance] = useState('');
  const [value, setValue] = useState({ location: '', distance: 0 });

  const handleChangeLocation = (val: string) => {
    setValue((prev) => ({ ...prev, location: val }));
  };

  const handleChangeDistance = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDistance(e.target.value);
    setValue((prev) => {
      return { ...prev, distance: +e.target.value };
    });
  };

  useEffect(() => {
    getDistance(value);
  }, [value]);

  useEffect(() => {
    setDistance('');
  }, [reset]);

  return (
    <>
      <div className='flex gap-5'>
        <Select
          options={options}
          color='blue'
          size='small'
          className='w-full'
          id='select-type-of-holiday'
          getValue={handleChangeLocation}
        />
        <input
          type='string'
          className='w-full rounded-md border border-blue-600 px-4 py-2'
          placeholder='Введите расстояние, км'
          value={distance}
          onChange={handleChangeDistance}
          name='distance'
          autoComplete='on'
        />
      </div>
    </>
  );
}
