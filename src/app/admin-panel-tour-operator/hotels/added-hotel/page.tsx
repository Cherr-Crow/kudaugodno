'use client';

import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/rtk/hooks';
import { createHotelTemp, selectorHotelCreate } from '@/rtk/slices/hotelCreate';
import { PopupWindow } from '@/shared/popup-window';
import { Typography } from '@/shared/typography';
import { AddedButton } from '@/shared/ui/added-button';
import { hotelNewMock } from '@/temp/hotel-new-mock';
import { AddedHotelField } from '@/widgets/admin-panel/added-hotel-field';
import { Hotel } from '@/types/hotel';
import axios from 'axios';

export default function AddedHotel() {
  const [value, setValue] = useState('');
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openField, setOpenField] = useState(false);

  const [newHotel, setNewHotel] = useState<Hotel>({} as Hotel);

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
    // TODO: тут должен быть запрос к серверу, на который вернётся новый отель с присвоенным id
    await axios
      .post('https://anywhere-test.god-it.ru/api/v1/hotels/', {
        name: 'test',
        star_category: 5,
        place: 'Test Name',
        country: 'string',
        city: 'string',
        address: 'string',
        distance_to_the_station: 200000,
        distance_to_the_sea: 200000,
        distance_to_the_center: 200000,
        distance_to_the_metro: 200000,
        distance_to_the_airport: 200000,
        description: 'string',
        check_in_time: '14:00:00',
        check_out_time: '12:00:00',
        amenities_common: [
          {
            name: 'string',
          },
        ],
        amenities_in_the_room: [
          {
            name: 'string',
          },
        ],
        amenities_sports_and_recreation: [
          {
            name: 'string',
          },
        ],
        amenities_for_children: [
          {
            name: 'string',
          },
        ],
        type_of_meals_ultra_all_inclusive: 10000,
        type_of_meals_all_inclusive: 10000,
        type_of_meals_full_board: 10000,
        type_of_meals_half_board: 10000,
        type_of_meals_only_breakfast: 10000,
        user_rating: 0,
        type_of_rest: 'Пляжный',
        rules: [
          {
            name: 'string',
            description: 'string',
          },
        ],
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

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
