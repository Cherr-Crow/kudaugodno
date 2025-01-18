'use client';

import React, { useEffect, useState } from 'react';
import { IAddedHotelField } from './AddedHotelField.types';
import { Typography } from '@/shared/typography';
import { Select } from '@/shared/ui/select';
import { SvgSprite } from '@/shared/svg-sprite';
import { Checkbox } from '@/shared/ui/checkbox';
import { AddedButton } from '@/shared/ui/added-button';
import { Rating } from '@/shared/rating';
import { nanoid } from 'nanoid';
import { NamedInput } from '@/shared/ui/named-input';

const typeOfHoliday = ['Пляжный', 'Городской'];
const accommodationType = [
  'Отель',
  'Хостел',
  'Вилла',
  'Апартаменты',
  'Гостевой дом',
  'Гостиница',
];
const distances = [
  'пляж',
  'центр',
  'аэропорт',
  'вокзал',
  'ларёк с пивом',
  'бабушка',
  'общественный туалет',
];
const comfort = [
  'Бассейн',
  'Собственный пляж',
  'Семейные номера',
  'Детский клуб',
  'Аквапарк',
  'Теннисный корт',
  'Ресторан a la carte',
  'Бесплатный интернет',
];

export function AddedHotelField({}: IAddedHotelField) {
  const [category, setCategory] = useState<number>(0);
  const [country, setCountry] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [checkIn, setCheckIn] = useState<string>('');
  const [departure, setDeparture] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [photo, setPhoto] = useState<string>('');

  const handleCategoryChange = (index: number) => {
    setCategory(index + 1);
  };

  const handleCountryChange = (val: string) => {
    setCountry(val);
  };

  const handleCityChange = (val: string) => {
    setCity(val);
  };

  const handleAddressChange = (val: string) => {
    setAddress(val);
  };

  const handleCheckIn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckIn(e.target.value);
  };

  const handleDeparture = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeparture(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoto(e.target.value);
  };

  return (
    <section className='grid grid-cols-2 gap-3'>
      <div className='w-full'>
        <Typography children='Тип отдыха' variant='l-bold' />
        <Select
          options={typeOfHoliday}
          color='blue'
          size='small'
          className='w-full'
          id='select-type-of-holiday'
        />
      </div>
      <div className='w-full'>
        <Typography children='Тип размещения' variant='l-bold' />
        <Select
          options={accommodationType}
          color='blue'
          size='small'
          className='w-full'
          id='select-type-of-placements'
        />
      </div>
      <div className='col-start-1 col-end-3 w-full'>
        <Typography children='Категория' variant='l-bold' />
        <Rating
          category={category}
          setRating={(index) => handleCategoryChange(index)}
        />
      </div>
      <NamedInput
        placeholder='Введите страну'
        name='country'
        getValue={handleCountryChange}
        title='Страна'
      />
      <NamedInput
        placeholder='Введите город'
        name='city'
        getValue={handleCityChange}
        title='Город'
      />
      <NamedInput
        placeholder='Введите адрес'
        name='address'
        getValue={handleAddressChange}
        title='Адрес'
        className='col-start-1 col-end-3'
      />
      <div className='col-start-1 col-end-3 flex flex-col gap-3'>
        <Typography children='Расстояние от' variant='l-bold' />
        <div className='flex gap-5'>
          <Select
            options={distances}
            color='blue'
            size='small'
            className='w-full'
            id='select-type-of-holiday'
          />
          <input
            type='text'
            className='w-full rounded-md border border-blue-600 px-4 py-2'
            placeholder='Введите расстояние, км'
            // value={address}
            // onChange={handleAddressChange}
            name='distance'
            autoComplete='on'
          />
        </div>
        <AddedButton text='Добавить расстояние' onClick={() => {}} />
      </div>
      <div className='col-start-1 col-end-3 flex w-full flex-col gap-3'>
        <Typography children='Удобства' variant='l-bold' />
        <ul className='flex gap-3'>
          {comfort.map((item, index) => (
            <li key={nanoid()}>
              <Checkbox label={item} />
            </li>
          ))}
        </ul>
        <AddedButton text='Добавить удобства' onClick={() => {}} />
      </div>
      <div className='flex w-full flex-col gap-3'>
        <Typography children='Заселение' variant='l-bold' />
        <input
          type='time'
          className='w-full rounded-md border border-blue-600 px-4 py-2'
          placeholder='12:00'
          value={checkIn}
          onChange={handleCheckIn}
          name='checkIn'
        />
      </div>
      <div className='flex w-full flex-col gap-3'>
        <Typography children='Выезд' variant='l-bold' />
        <input
          type='time'
          className='w-full rounded-md border border-blue-600 px-4 py-2'
          placeholder='12:00'
          value={departure}
          onChange={handleDeparture}
          name='departure'
        />
      </div>
      <div className='col-start-1 col-end-3 flex w-full flex-col gap-3'>
        <Typography children='Описание' variant='l-bold' />
        <textarea
          className='w-full resize-none rounded-md border border-blue-600 px-4 py-2'
          placeholder='Введите описание отеля'
          value={description}
          onChange={handleDescriptionChange}
          name='description'
        />
      </div>
      <div className='col-start-1 col-end-3 flex w-full flex-col gap-3'>
        <Typography children='Фотографии' variant='l-bold' />
        <div className='flex gap-2'>
          <ul className='flex gap-2'>
            <li className='relative h-24 w-24 overflow-hidden rounded-2xl border md:h-32 md:w-32'>
              <img src='/mob_picture_404.png' alt='' className='h-full w-full' />
              <div className='absolute left-0 top-0 z-10 h-full w-full cursor-pointer bg-grey-secondary opacity-0 hover:opacity-70'>
                <SvgSprite
                  name='trash-light'
                  width={24}
                  color='white'
                  className='relative left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
                />
              </div>
            </li>
            <li className='relative h-24 w-24 overflow-hidden rounded-2xl border md:h-32 md:w-32'>
              <img src='/mob_picture_404.png' alt='' className='h-full w-full' />
              <div className='absolute left-0 top-0 z-10 h-full w-full cursor-pointer bg-grey-secondary opacity-0 hover:opacity-70'>
                <SvgSprite
                  name='trash-light'
                  width={24}
                  color='white'
                  className='relative left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
                />
              </div>
            </li>
          </ul>
          <label
            htmlFor='file'
            className='relative block h-24 w-24 cursor-pointer rounded-2xl border border-blue-600 md:h-32 md:w-32'
          >
            <input
              type='file'
              accept='image/*,.jpg,.png,.jpeg'
              id='file'
              // value={photo}
              onChange={handlePhotoChange}
              className='h-20 w-20 cursor-pointer opacity-0'
            />
            <span className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl text-blue-600'>
              +
            </span>
          </label>
        </div>
      </div>
    </section>
  );
}
