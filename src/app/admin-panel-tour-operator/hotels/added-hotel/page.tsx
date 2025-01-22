'use client';

import { PopupWindow } from '@/shared/popup-window';
import { Typography } from '@/shared/typography';
import { AddedButton } from '@/shared/ui/added-button';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { AddedHotelField } from '../../../../widgets/admin-panel/added-hotel-field';
import React, { useEffect, useState } from 'react';

export default function AddedHotel() {
  const [value, setValue] = useState('');
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openField, setOpenField] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (e.target.value.length > 1) {
      setOpenDropdown(true);
    } else {
      setOpenDropdown(false);
    }
  };

  const handleFieldClick = () => {
    setOpenField(true);
  };

  useEffect(() => {
    window.addEventListener('click', () => setOpenDropdown(false));

    return () => {
      window.removeEventListener('click', () => setOpenDropdown(false));
    };
  }, []);

  return (
    <div className='flex w-full flex-col gap-10'>
      <Typography children='Отель' variant='h4' />
      <div className='relative flex flex-col gap-2'>
        <Typography children='Название отеля' variant='l-bold' />
        <input
          type='text'
          className='w-full rounded-lg border border-blue-600 p-3'
          placeholder='Введите название отеля'
          value={value}
          onChange={handleChange}
          name='nameHotel'
        />
        {openDropdown && (
          <PopupWindow className='top-[110%] flex flex-col gap-2 px-5 py-4'>
            <Typography children='Этого отеля нет в нашей базе' />
            <AddedButton text='Добавить отель' onClick={handleFieldClick} />
          </PopupWindow>
        )}
      </div>
      {openField && <AddedHotelField />}
    </div>
  );
}
