'use client';

import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { useAppDispatch, useAppSelector } from '@/rtk/hooks';
import { createHotelTemp, selectorHotelCreate } from '@/rtk/slices/hotelCreate';
import { PopupWindow } from '@/shared/popup-window';
import { Typography } from '@/shared/typography';
import { AddedButton } from '@/shared/ui/added-button';
import { hotelNewMock } from '@/temp/hotel-new-mock';
import { AddedHotelField } from '@/widgets/admin-panel/added-hotel-field';

export default function AddedHotel() {
  const [value, setValue] = useState('');
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openField, setOpenField] = useState(false);

  const [newHotel, setNewHotel] = useState();

  const dispatch = useAppDispatch();
  const { data } = useAppSelector(selectorHotelCreate);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (e.target.value.length > 1) {
      setOpenDropdown(true);
    } else {
      setOpenDropdown(false);
    }
  };

  const handleFieldClick = async () => {
    //TODO: тут должен быть запрос к серверу, на который вернётся новый отель с присвоенным id

    axios
      .post(
        'https://ku.mer1d1an.ru/api/v1/hotels/',
        {
          name: value,
        },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => console.log(response));

    dispatch(createHotelTemp(hotelNewMock));
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
        {openDropdown && !openField && (
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
