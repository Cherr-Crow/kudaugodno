'use client';

import React, { useState } from 'react';

import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';

import {
  useChangeHotelMutation,
  useDeleteHotelMutation,
  useGetOneHotelQuery,
} from '@/sericesApi/hotelsApi';
import { Accordeon } from '@/shared/accordeon';
import { Rating } from '@/shared/rating';
import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';
import { AddedButton } from '@/shared/ui/added-button';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { Checkbox } from '@/shared/ui/checkbox';
import { NamedInput } from '@/shared/ui/named-input';
import { Select } from '@/shared/ui/select';
import { Hotel } from '@/types/hotel';
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

export function AddedHotelField({ hotel }: IAddedHotelField) {
  const { data } = useGetOneHotelQuery(hotel.id);
  const [deletHotel] = useDeleteHotelMutation();
  const [changeHotel] = useChangeHotelMutation();
  const route = useRouter();
  const [category, setCategory] = useState<number>(data?.star_category || 0);
  const [country, setCountry] = useState<string>(data?.country || '');
  const [city, setCity] = useState<string>(data?.city || '');
  const [address, setAddress] = useState<string>(data?.address || '');
  const [checkIn, setCheckIn] = useState<string>(data?.check_in_time || '');
  const [departure, setDeparture] = useState<string>(data?.check_out_time || '');
  const [description, setDescription] = useState<string>(data?.description || '');
  const [photo, setPhoto] = useState<string>('');
  const [distance, setDistance] = useState<{
    location: string;
    distance: number;
  } | null>(null);

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

  // const handleDistanceChange = (e: { location: string; distance: number }) => {
  //   setDistance(e);
  // };

  const handleCancel = () => {
    deletHotel(hotel.id);
    route.push('/admin-panel-tour-operator/hotels');
  };

  const handleSaved = () => {
    // const _obj: Omit<Hotel, 'rooms' | 'dates' | 'id'> = {
    //   address: address || '',
    //   country: country || '',
    //   city: city || '',
    //   description: description || '',
    //   name: hotel.name,
    //   star_category: 0,
    //   place: '',
    //   distance_to_the_station: null,
    //   distance_to_the_sea: 0,
    //   distance_to_the_center: 0,
    //   distance_to_the_metro: 0,
    //   distance_to_the_airport: 0,
    //   check_in_time: '',
    //   check_out_time: '',
    //   amenities_common: [],
    //   amenities_in_the_room: [],
    //   amenities_sports_and_recreation: [],
    //   amenities_for_children: [],
    //   type_of_meals_ultra_all_inclusive: null,
    //   type_of_meals_all_inclusive: null,
    //   type_of_meals_full_board: null,
    //   type_of_meals_half_board: null,
    //   type_of_meals_only_breakfast: null,
    //   user_rating: 0,
    //   reviews: [],
    //   photos: [],
    //   type_of_rest: '',
    //   rules: [],
    // };
    const _obj: Omit<Hotel, 'rooms' | 'dates' | 'id' | 'reviews' | 'photos'> = {
      name: 'новый-новый',
      star_category: 5,
      place: 'Отель',
      country: 'страна',
      city: 'город',
      address: 'адрес',
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
    };
    console.log(_obj);
    changeHotel({ body: _obj, id: hotel.id });
  };

  return (
    <section className='flex flex-col gap-4'>
      <Accordeon title='Общие'>
        <div className='flex flex-col gap-4 p-5'>
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
          <div className='w-full'>
            <Typography variant='l-bold'>Категория</Typography>
            <Rating
              category={category}
              setRating={(index) => handleCategoryChange(index)}
            />
          </div>
          <div className='flex w-full flex-col gap-3'>
            <Typography children='Описание' variant='l-bold' />
            <textarea
              className='w-full resize-none rounded-md border border-blue-600 px-4 py-2'
              placeholder='Введите описание отеля'
              value={description}
              onChange={handleDescriptionChange}
              name='description'
            />
          </div>
          <div className='flex w-full flex-col gap-3'>
            <Typography children='Фотографии' variant='l-bold' />
            <div className='flex gap-2'>
              <ul className='flex gap-2'>
                <li className='relative h-24 w-24 overflow-hidden rounded-2xl border md:h-32 md:w-32'>
                  <img
                    src='/mob_picture_404.png'
                    alt=''
                    className='h-full w-full'
                    rel='prefetch'
                  />
                  <div className='absolute left-0 top-0 z-10 h-full w-full cursor-pointer bg-grey-700 opacity-0 hover:opacity-70'>
                    <SvgSprite
                      name='trash-light'
                      width={24}
                      color='white'
                      className='relative left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
                    />
                  </div>
                </li>
                <li className='relative h-24 w-24 overflow-hidden rounded-2xl border md:h-32 md:w-32'>
                  <img
                    src='/mob_picture_404.png'
                    alt=''
                    className='h-full w-full'
                    rel='prefetch'
                  />
                  <div className='absolute left-0 top-0 z-10 h-full w-full cursor-pointer bg-grey-700 opacity-0 hover:opacity-70'>
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
        <div className='flex flex-col gap-2 p-5'>
          <NamedInput
            placeholder='Введите страну'
            name='country'
            getValue={handleCountryChange}
            title='Страна'
            startValue={country}
          />
          <NamedInput
            placeholder='Введите город'
            name='city'
            getValue={handleCityChange}
            title='Город'
            startValue={city}
          />
          <NamedInput
            placeholder='Введите адрес'
            name='address'
            getValue={handleAddressChange}
            title='Адрес'
            startValue={address}
          />
          <div className='flex flex-col'>
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
        <div className='flex gap-2 p-5'>
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
        <div className='flex flex-col gap-2 p-5'>
          <div className='flex gap-2'>
            <NamedInput
              name='checkIn'
              getValue={handleCheckIn}
              title='Заселение'
              type='time'
              startValue={checkIn}
            />
            <NamedInput
              name='departure'
              getValue={handleDeparture}
              title='Выезд'
              type='time'
              startValue={departure}
            />
          </div>
          <RulesAdd />
        </div>
      </Accordeon>
      <Accordeon title='Дополнительно'>
        <div className='flex w-full flex-col gap-3 p-5'>
          <Typography children='Удобства' variant='l-bold' />
          <ul className='flex flex-col gap-2'>
            {comfort.map((category, index) => (
              <li
                key={nanoid()}
                className={`flex flex-col gap-2 rounded p-2 ${index % 2 === 0 && 'bg-blue-50'}`}
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
      <div className={`mt-10 flex justify-end gap-4`}>
        <ButtonCustom variant='secondary' size='m' onClick={handleCancel}>
          <Typography children='Отменить' variant='l-bold' />
        </ButtonCustom>
        <ButtonCustom variant='primary' size='m' onClick={handleSaved}>
          <Typography children='Сохранить' variant='l-bold' />
        </ButtonCustom>
      </div>
    </section>
  );
}
