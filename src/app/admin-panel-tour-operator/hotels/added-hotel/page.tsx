'use client';

import React, { useEffect, useState } from 'react';

import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';

import { useAddHotelMutation, useGetHotelsQuery } from '@/servicesApi/hotelsApi';
import { PopupWindow } from '@/shared/popup-window';
import { Typography } from '@/shared/typography';
import { AddedButton } from '@/shared/ui/added-button';
import { IHotel } from '@/types/hotel';

export default function AddedHotel() {
  const [addHotel, { data: newHotelResponce }] = useAddHotelMutation();
  const { data } = useGetHotelsQuery({});
  const router = useRouter();
  const [listOfMatches, setListOfMatches] = useState<IHotel[]>([] as IHotel[]);
  const [value, setValue] = useState('');
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    setListOfMatches(
      data?.results.filter((el) =>
        el.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()),
      ) || ([] as IHotel[]),
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

  useEffect(() => {
    if (!newHotelResponce) return;

    router.push(
      `/admin-panel-tour-operator/hotels/change-hotel/?id=${newHotelResponce['id']}`,
    );
  }, [newHotelResponce]);

  return (
    <div className='flex w-full flex-col gap-10'>
      <Typography variant='h4'>Отель</Typography>
      <div className='relative flex flex-col gap-2'>
        <Typography variant='l-bold'>Название отеля</Typography>
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
                {listOfMatches.map((item: IHotel) => (
                  <li key={nanoid()}>
                    <Typography>{item.name}</Typography>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <Typography>Этого отеля нет в нашей базе</Typography>
                <AddedButton text='Добавить отель' onClick={handleFieldClick} />
              </>
            )}
          </PopupWindow>
        )}
      </div>
    </div>
  );
}
