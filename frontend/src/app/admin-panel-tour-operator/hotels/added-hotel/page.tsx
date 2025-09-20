'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useAddHotelMutation, useGetHotelsQuery } from '@/servicesApi/hotelsApi';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { Typography } from '@/shared/ui/typography';
import { IHotelMiniData } from '@/types/hotel';

export default function AddedHotel() {
  const [addHotel, { data: newHotelResponce }] = useAddHotelMutation();
  const { data } = useGetHotelsQuery({});
  const router = useRouter();

  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [name, setName] = useState('');

  const [error, setError] = useState('');

  const handleAddHotel = () => {
    if (!country || !city || !name) {
      setError('Все поля должны быть заполнены');
      return;
    }

    const isExist = data?.results.some(
      (el: IHotelMiniData) =>
        el.name.toLowerCase() === name.toLowerCase() &&
        el.city?.toLowerCase() === city.toLowerCase() &&
        el.country?.toLowerCase() === country.toLowerCase(),
    );

    if (isExist) {
      setError('Отель уже есть в базе! Проверьте название и адрес');
      return;
    }

    addHotel({ country, city, name });
  };

  useEffect(() => {
    if (newHotelResponce) {
      router.push(
        `/admin-panel-tour-operator/hotels/change-hotel/?id=${newHotelResponce['id']}`,
      );
    }
  }, [newHotelResponce]);

  return (
    <div className='flex flex-col gap-10'>
      <div className='flex w-full gap-5'>
        <div className='relative flex flex-col'>
          <Typography variant='l'>Страна</Typography>
          <input
            type='text'
            className='w-[270px] rounded-lg border border-grey-200 p-[10px] hover:border-blue-500 focus:outline-blue-500'
            placeholder='Введите страну отеля'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            name='contryHotel'
          />
        </div>
        <div className='relative flex flex-col'>
          <Typography variant='l'>Город</Typography>
          <input
            type='text'
            className='w-[270px] rounded-lg border border-grey-200 p-[10px] hover:border-blue-500 focus:outline-blue-500'
            placeholder='Введите город отеля'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            name='cityHotel'
          />
        </div>
        <div className='relative flex flex-col'>
          <Typography variant='l'>Название отеля</Typography>
          <input
            type='text'
            className='w-[400px] rounded-lg border border-grey-200 p-[10px] hover:border-blue-500 focus:outline-blue-500'
            placeholder='Введите название отеля'
            value={name}
            onChange={(e) => setName(e.target.value)}
            name='nameHotel'
          />
          {error && (
            <Typography variant='s' className='mt-1 text-red-primary-800'>
              {error}
            </Typography>
          )}
        </div>
      </div>
      <div className='flex justify-end gap-4'>
        <ButtonCustom
          size='l'
          variant='secondary'
          className='min-w-[131px]'
          onClick={() => router.back()}
        >
          <Typography variant='l-bold'>Назад</Typography>
        </ButtonCustom>
        <ButtonCustom
          size='l'
          variant='primary'
          className='min-w-[447px]'
          onClick={handleAddHotel}
        >
          <Typography variant='l-bold'>
            Добавить отель и редактировать данные
          </Typography>
        </ButtonCustom>
      </div>
    </div>
  );
}
