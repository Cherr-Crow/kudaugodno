'use client';

import React, { useState } from 'react';

import { nanoid } from 'nanoid';

import { useAddHotelMutation, useGetHotelsQuery } from '@/sericesApi/hotelsApi';
import { PopupWindow } from '@/shared/popup-window';
import { Typography } from '@/shared/typography';
import { AddedButton } from '@/shared/ui/added-button';
import { Hotel } from '@/types/hotel';
import { AddedHotelField } from '@/widgets/admin-panel/added-hotel-field';

export default function AddedHotel() {
  const [addHotel, { data: newHotelResponce }] = useAddHotelMutation();
  const { data } = useGetHotelsQuery();
  const [listOfMatches, setListOfMatches] = useState<Hotel[]>([] as Hotel[]);
  const [value, setValue] = useState('');
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    setListOfMatches(
      data?.results.filter((el) =>
        el.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()),
      ) || ([] as Hotel[]),
    );

    if (e.target.value.length > 1) {
      setOpenDropdown(true);
    } else {
      setOpenDropdown(false);
    }
  };

  const handleFieldClick = async () => {
    await addHotel({ name: value });
    setOpenDropdown(false);
  };

  return (
    <div className='flex w-full flex-col gap-10'>
      <Typography children='Отель' variant='h4' />
      {newHotelResponce ? (
        <AddedHotelField hotelId={newHotelResponce.id} />
      ) : (
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
              {!!listOfMatches.length ? (
                <ul>
                  {listOfMatches.map((item: Hotel) => (
                    <li key={nanoid()}>
                      <Typography>{item.name}</Typography>
                    </li>
                  ))}
                </ul>
              ) : (
                <>
                  <Typography children='Этого отеля нет в нашей базе' />
                  <AddedButton text='Добавить отель' onClick={handleFieldClick} />
                </>
              )}
            </PopupWindow>
          )}
        </div>
      )}
    </div>
  );
}
