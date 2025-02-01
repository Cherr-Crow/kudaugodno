'use client';
// eslint-disable @typescript-eslint/no-unused-vars

import React, { useState } from 'react';

import { nanoid } from 'nanoid';

import { Accordeon } from '@/shared/accordeon';
import { Rating } from '@/shared/rating';
import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';
import { AddedButton } from '@/shared/ui/added-button';
import { Checkbox } from '@/shared/ui/checkbox';
import { NamedInput } from '@/shared/ui/named-input';
import { Select } from '@/shared/ui/select';
import { RulesAdd } from '@/widgets/admin-panel/rules-add';

import { IAddedHotelField } from './AddedHotelField.types';

const typeOfHoliday = ['Пляжный', 'Городской'];
const accommodationType = [
  'Отель',
  'Хостел',
  'Вилла',
  'Апартаменты',
  'Гостевой дом',
  'Гостиница',
];
const distancesName = ['моря', 'центра', 'вокзала', 'аэропорта', 'метро'];
const comfort = [
  {
    category_name: 'В номере',
    amenity: ['Бесплатный интернет', 'Вид на море', 'Кондиционеры'],
  },
  {
    category_name: 'Общие',
    amenity: [
      'Семейные номера',
      'Ресторан a la carte',
      'Собственный пляж',
      'Шоу-программа',
    ],
  },
  {
    category_name: 'Спорт и отдых',
    amenity: ['Бассейн', 'Теннисный корт', 'Спортзал', 'Спа-центр'],
  },
  {
    category_name: 'Для детей',
    amenity: ['Детский клуб', 'Аквапарк', 'Вечерняя анимация'],
  },
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
  const [distance, setDistance] = useState<{
    location: string;
    distance: number;
  } | null>(null);
  const [distances, setDistances] = useState<
    { location: string; distance: number }[]
  >([]);
  const [distanceInputReset, setDistanceInputReset] = useState(false);

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

  const handleCheckIn = (val: string) => {
    setCheckIn(val);
  };

  const handleDeparture = (val: string) => {
    setDeparture(val);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoto(e.target.value);
  };

  const handleDistanceChange = (e: { location: string; distance: number }) => {
    setDistance(e);
  };

  const handleAddDistance = () => {
    if (distances.some((el) => el.location === distance?.location) || !distance) {
      return;
    }

    setDistances((prev) => [...prev, distance]);
    setDistanceInputReset(!distanceInputReset);
  };

  const handleDeleteDistance = (arg: string) => {
    setDistances((prev) => prev.filter((el) => el.location !== arg));
  };

  return (
    <section className='flex flex-col gap-3'>
      <Accordeon title='Общие' className=''>
        <div className='flex flex-col gap-2 py-2'>
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
            <Typography variant='l-bold'>Тип размещения</Typography>
            <Select
              options={accommodationType}
              color='blue'
              size='small'
              className='w-full'
              id='select-type-of-placements'
            />
          </div>
          <div className='col-span-2 w-full'>
            <Typography variant='l-bold'>Категория</Typography>
            <Rating
              category={category}
              setRating={(index) => handleCategoryChange(index)}
            />
          </div>
          <div className='col-span-2 flex w-full flex-col gap-3'>
            <Typography children='Описание' variant='l-bold' />
            <textarea
              className='w-full resize-none rounded-md border border-blue-600 px-4 py-2'
              placeholder='Введите описание отеля'
              value={description}
              onChange={handleDescriptionChange}
              name='description'
            />
          </div>
          <div className='col-span-2 flex w-full flex-col gap-3'>
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
        </div>
      </Accordeon>
      <Accordeon title='Локация'>
        <div className='flex flex-col gap-2 py-2'>
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
            className='col-span-2'
          />
          <div className='col-span-2 flex flex-col'>
            <Typography
              children='Расстояния от отеля до основных точек'
              variant='l-bold'
            />
            <ul className='flex gap-2'>
              {distancesName.map((item) => (
                <li key={nanoid()} className='w-full'>
                  <NamedInput
                    placeholder='расстояние в метрах'
                    name='address'
                    getValue={handleAddressChange}
                    title={item}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Accordeon>
      <Accordeon title='Питание'>
        <div className='flex gap-2 py-2'>
          <NamedInput
            placeholder='цена за одного гостя'
            name='address'
            getValue={handleAddressChange}
            title='только завтрак'
          />
          <NamedInput
            placeholder='цена за одного гостя'
            name='address'
            getValue={handleAddressChange}
            title='полупансион'
          />
          <NamedInput
            placeholder='цена за одного гостя'
            name='address'
            getValue={handleAddressChange}
            title='полный пансион'
          />
          <NamedInput
            placeholder='цена за одного гостя'
            name='address'
            getValue={handleAddressChange}
            title='все включено'
          />
          <NamedInput
            placeholder='цена за одного гостя'
            name='address'
            getValue={handleAddressChange}
            title='ультра все включено'
          />
        </div>
      </Accordeon>
      <Accordeon title='Регламент'>
        <div className='flex flex-col gap-2 py-2'>
          <div className='flex gap-2'>
            <NamedInput
              name='checkIn'
              getValue={handleCheckIn}
              title='Заселение'
              type='time'
            />
            <NamedInput
              name='departure'
              getValue={handleDeparture}
              title='Выезд'
              type='time'
            />
          </div>
          <RulesAdd className='col-span-2' />
        </div>
      </Accordeon>
      <Accordeon title='Дополнительно'>
        <div className='col-span-2 flex w-full flex-col gap-3 py-2'>
          <Typography children='Удобства' variant='l-bold' />
          <ul className='flex flex-col gap-2'>
            {comfort.map((category, index) => (
              <li
                key={nanoid()}
                className={`flex flex-col gap-2 rounded p-2 ${index % 2 === 0 && 'bg-blue-disabled'}`}
              >
                <Typography children={category.category_name} variant='l' />
                <ul className='flex gap-3'>
                  {category.amenity.map((item) => (
                    <li key={nanoid()}>
                      <Checkbox label={item} />
                    </li>
                  ))}
                </ul>
                <AddedButton text='Добавить удобства' onClick={() => {}} />
              </li>
            ))}
          </ul>
        </div>
      </Accordeon>
    </section>
  );
}
