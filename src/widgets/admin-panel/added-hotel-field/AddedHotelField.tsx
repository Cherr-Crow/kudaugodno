/* eslint-disable no-commented-code/no-commented-code */
'use client';

import React, { useEffect, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import {
  useChangeHotelMutation,
  useDeleteHotelMutation,
  useGetOneHotelQuery,
} from '@/servicesApi/hotelsApi';
import { Rating } from '@/shared/rating';
import { Accordeon } from '@/shared/ui/accordeon';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { NamedInput } from '@/shared/ui/named-input';
import { Select } from '@/shared/ui/select';
import { useToast } from '@/shared/ui/toast/toastService';
import { Typography } from '@/shared/ui/typography';
import { IHotel } from '@/types/hotel';
import {
  accommodationType,
  amenities_common,
  amenities_for_children,
  amenities_in_the_room,
  amenities_sports_and_recreation,
  typeOfHoliday,
} from '@/widgets/admin-panel/added-hotel-field/services/arrais';
import { CheckBoxBlock } from '@/widgets/admin-panel/check-box-block';
import { PhotosHotel } from '@/widgets/admin-panel/photos-hotel';
import { RulesAdd } from '@/widgets/admin-panel/rules-add';

import { IAddedHotelField } from './AddedHotelField.types';

export function AddedHotelField({ hotelId }: IAddedHotelField) {
  const { data } = useGetOneHotelQuery(hotelId);
  const [deletHotel] = useDeleteHotelMutation();
  const [changeHotel, { data: cangeValueHotel, isError }] = useChangeHotelMutation();
  const route = useRouter();
  const path = usePathname();
  const { showToast } = useToast();

  const [name, setName] = useState(data?.name || ''); // название отеля
  const [starCategory, setStarCategory] = useState(data?.star_category || 0); // количество звёзд
  const [place, setPlace] = useState(data?.place || ''); // тип размещения
  const [country, setCountry] = useState(data?.country || ''); // страна
  const [city, setCity] = useState(data?.city || ''); // город
  const [address, setAddress] = useState(data?.address || ''); // адрес
  const [latitude, setLatitude] = useState(data?.width || ''); // широта
  const [longitude, setLongitude] = useState(data?.longitude || ''); // долгота
  const [distanceToTheStation, setDstanceToTheStation] = useState(
    data?.distance_to_the_station || null,
  ); // расстояние до вокзала
  const [distanceToTheSea, setDstanceToTheSea] = useState(
    data?.distance_to_the_sea || null,
  ); // расстояние до моря
  const [distanceToTheCenter, setDstanceToTheCenter] = useState(
    data?.distance_to_the_center || null,
  ); // расстояние до ценра
  const [distanceToTheMetro, setDstanceToTheMetro] = useState(
    data?.distance_to_the_metro || null,
  ); // расстояние до метро
  const [distanceToTheAirport, setDstanceToTheAirport] = useState(
    data?.distance_to_the_airport || null,
  ); // расстояние до аэропорта
  const [description, setDscription] = useState(data?.description || ''); // описание
  const [checkInTime, setCheckInTime] = useState(data?.check_in_time || '00:00'); // время заезда
  const [checkOutTime, setCheckOutTime] = useState(data?.check_out_time || '00:00'); // время выезда
  const [amenitiesCommon, setAmenitiesCommon] = useState(
    !!data?.amenities_common.length ? data?.amenities_common : amenities_common,
  ); // общие удобства
  const [amenitiesInTheRoom, setAmenitiesInTheRoom] = useState(
    !!data?.amenities_in_the_room.length
      ? data?.amenities_in_the_room
      : amenities_in_the_room,
  ); // удобства в номере
  const [amenitiesSportsAndRecreation, setAmenitiesSportsAndRecreation] = useState(
    !!data?.amenities_sports_and_recreation.length
      ? data?.amenities_sports_and_recreation
      : amenities_sports_and_recreation,
  ); // удобства спорт и отдых
  const [amenitiesForChildren, setAmenitiesForChildren] = useState(
    !!data?.amenities_for_children.length
      ? data?.amenities_for_children
      : amenities_for_children,
  ); // удобства для детей
  // const [typeOfMealsUltraAllInclusive, setTypeOfMealsUltraAllInclusive] = useState(
  //   data?.type_of_meals_ultra_all_inclusive || null,
  // ); // цена питания ультра
  // const [typeOfMealsAllInclusive, setTypeOfMealsAllInclusive] = useState(
  //   data?.type_of_meals_all_inclusive || null,
  // ); // цена питания всё включено
  // const [typeOfMealsFullBoard, setTypeOfMealsFullBoard] = useState(
  //   data?.type_of_meals_full_board || null,
  // ); // цена питания полный пансион
  // const [typeOfMealsHalfBoard, setTypeOfMealsHalfBoard] = useState(
  //   data?.type_of_meals_half_board || null,
  // ); // цена питания полу пансион
  // const [typeOfMealsOnlyBreakfast, setTypeOfMealsOnlyBreakfast] = useState(
  //   data?.type_of_meals_only_breakfast || null,
  // ); // цена питания только завтрак
  const [typeOfRest, setTypeOfRest] = useState(data?.type_of_rest || ''); //
  const [rules, setRules] = useState(data?.rules || []); // тип отдыха
  const isActive = true; // активный или архивный
  const userRating = 8.5; // рэйтинг посетителей

  useEffect(() => {
    if (!data) return;
    setName(data.name);
  }, [data]);

  const handleCancel = () => {
    if (path.includes('added-hotel')) deletHotel(hotelId);
    route.push('/admin-panel-tour-operator/hotels');
  };

  const handleSaved = () => {
    const _obj: Omit<IHotel, 'rooms' | 'id' | 'reviews' | 'photo'> = {
      name,
      star_category: starCategory,
      place,
      country,
      city,
      address,
      distance_to_the_station: distanceToTheStation,
      distance_to_the_sea: distanceToTheSea,
      distance_to_the_center: distanceToTheCenter,
      distance_to_the_metro: distanceToTheMetro,
      distance_to_the_airport: distanceToTheAirport,
      description,
      check_in_time: checkInTime,
      check_out_time: checkOutTime,
      amenities_common: amenitiesCommon,
      amenities_in_the_room: amenitiesInTheRoom,
      amenities_sports_and_recreation: amenitiesSportsAndRecreation,
      amenities_for_children: amenitiesForChildren,
      // type_of_meals_ultra_all_inclusive: typeOfMealsUltraAllInclusive,
      // type_of_meals_all_inclusive: typeOfMealsAllInclusive,
      // type_of_meals_full_board: typeOfMealsFullBoard,
      // type_of_meals_half_board: typeOfMealsHalfBoard,
      // type_of_meals_only_breakfast: typeOfMealsOnlyBreakfast,
      user_rating: userRating,
      type_of_rest: typeOfRest,
      rules,
      is_active: isActive,
      // room_categories: ['Стандарт', 'Полулюкс', 'Люкс', 'Апартаменты', 'Студия'],
      width: latitude,
      longitude: longitude,
    };
    try {
      changeHotel({ body: _obj, id: hotelId });
      showToast('Данные успешно сохранены', 'success');
    } catch {
      showToast('Ошибка сервера', 'error');
    }
  };

  useEffect(() => {
    if (cangeValueHotel) {
      route.push('/admin-panel-tour-operator/hotels');
      return;
    }
  }, [cangeValueHotel, isError]);

  return (
    <section className='flex flex-col gap-4'>
      <div className='relative flex flex-col gap-2'>
        <Typography variant='l-bold'>Название отеля</Typography>
        <input
          type='text'
          className='w-full rounded-lg border border-blue-600 p-3'
          placeholder='Введите название отеля'
          value={name}
          onChange={(e) => setName(e.target.value)}
          name='nameHotel'
        />
      </div>
      <Accordeon title='Общие'>
        <div className='flex flex-col gap-4 p-5'>
          <div className='w-full'>
            <Typography variant='l-bold'>Тип отдыха</Typography>
            <Select
              options={typeOfHoliday}
              color='blue'
              size='small'
              className='w-full'
              id='select-type-of-holiday'
              getValue={setTypeOfRest}
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
              getValue={setPlace}
            />
          </div>
          <div className='w-full'>
            <Typography variant='l-bold'>Категория</Typography>
            <Rating
              category={starCategory}
              setRating={(index) => setStarCategory(index + 1)}
            />
          </div>
          <div className='flex w-full flex-col gap-3'>
            <Typography variant='l-bold'>Описание</Typography>
            <textarea
              className='w-full resize-none rounded-md border border-blue-600 px-4 py-2'
              placeholder='Введите описание отеля'
              value={description}
              onChange={(e) => setDscription(e.target.value)}
              name='description'
            />
          </div>
          <PhotosHotel />
        </div>
      </Accordeon>
      <Accordeon title='Локация'>
        <div className='flex flex-col gap-2 p-5'>
          <NamedInput
            placeholder='Введите страну'
            name='country'
            getValue={(val) => setCountry(val as string)}
            title='Страна'
            startValue={country}
          />
          <NamedInput
            placeholder='Введите город'
            name='city'
            getValue={(val) => setCity(val as string)}
            title='Город'
            startValue={city}
          />
          <NamedInput
            placeholder='Введите адрес'
            name='address'
            getValue={(val) => setAddress(val as string)}
            title='Адрес'
            startValue={address}
          />
          <div className='flex flex-col gap-[10px] md:flex-row md:gap-[20px]'>
            <NamedInput
              placeholder='Введите широту'
              name='latitude'
              getValue={(val) => setLatitude(val as string)}
              title='Широта'
              startValue={latitude}
            />
            <NamedInput
              placeholder='Введите долготу'
              name='longitude'
              getValue={(val) => setLongitude(val as string)}
              title='Долгота'
              startValue={longitude}
            />
          </div>
          <div className='flex flex-col'>
            <Typography variant='l-bold'>
              Расстояния от отеля до основных точек
            </Typography>
            <div className='flex gap-2'>
              <NamedInput
                placeholder='расстояние в метрах'
                name='address'
                getValue={(val) => setDstanceToTheSea(val as number)}
                title='Моря'
                type='number'
                startValue={0}
              />
              <NamedInput
                placeholder='расстояние в метрах'
                name='address'
                getValue={(val) => setDstanceToTheCenter(val as number)}
                title='Центра'
                type='number'
                startValue={0}
              />
              <NamedInput
                placeholder='расстояние в метрах'
                name='address'
                getValue={(val) => setDstanceToTheStation(val as number)}
                title='Вокзала'
                type='number'
                startValue={0}
              />
              <NamedInput
                placeholder='расстояние в метрах'
                name='address'
                getValue={(val) => setDstanceToTheAirport(val as number)}
                title='Аэропорта'
                type='number'
                startValue={0}
              />
              <NamedInput
                placeholder='расстояние в метрах'
                name='address'
                getValue={(val) => setDstanceToTheMetro(val as number)}
                title='Метро'
                type='number'
                startValue={0}
              />
            </div>
          </div>
        </div>
      </Accordeon>
      {/* <Accordeon title='Питание'>
        <div className='flex gap-2 p-5'>
          <NamedInput
            placeholder='цена за одного гостя'
            name='address'
            getValue={(val) => setTypeOfMealsOnlyBreakfast(val as number)}
            title='только завтрак'
          />
          <NamedInput
            placeholder='цена за одного гостя'
            name='address'
            getValue={(val) => setTypeOfMealsHalfBoard(val as number)}
            title='полупансион'
          />
          <NamedInput
            placeholder='цена за одного гостя'
            name='address'
            getValue={(val) => setTypeOfMealsFullBoard(val as number)}
            title='полный пансион'
          />
          <NamedInput
            placeholder='цена за одного гостя'
            name='address'
            getValue={(val) => setTypeOfMealsAllInclusive(val as number)}
            title='все включено'
          />
          <NamedInput
            placeholder='цена за одного гостя'
            name='address'
            getValue={(val) => setTypeOfMealsUltraAllInclusive(val as number)}
            title='ультра все включено'
          />
        </div>
      </Accordeon> */}
      <Accordeon title='Регламент'>
        <div className='flex flex-col gap-2 p-5'>
          <div className='flex gap-2'>
            <NamedInput
              name='checkIn'
              getValue={(val) => setCheckInTime(val as string)}
              title='Заселение'
              type='time'
              startValue={checkInTime}
            />
            <NamedInput
              name='departure'
              getValue={(val) => setCheckOutTime(val as string)}
              title='Выезд'
              type='time'
              startValue={checkOutTime}
            />
          </div>
          <RulesAdd getRules={setRules} oldRules={data?.rules} />
        </div>
      </Accordeon>
      <Accordeon title='Дополнительно'>
        <div className='flex w-full flex-col gap-3 p-5'>
          <Typography variant='l-bold'>Удобства</Typography>
          <CheckBoxBlock
            title='Общие'
            checkboxes={amenitiesCommon}
            getNewList={setAmenitiesCommon}
            className='bg-blue-50'
          />
          <CheckBoxBlock
            title='Удобвства а номерах'
            checkboxes={amenitiesInTheRoom}
            getNewList={setAmenitiesInTheRoom}
          />
          <CheckBoxBlock
            title='Спорт и оттдых'
            checkboxes={amenitiesSportsAndRecreation}
            getNewList={setAmenitiesSportsAndRecreation}
            className='bg-blue-50'
          />
          <CheckBoxBlock
            title='Для детей'
            checkboxes={amenitiesForChildren}
            getNewList={setAmenitiesForChildren}
          />
        </div>
      </Accordeon>
      <div className={`mt-10 flex justify-end gap-4`}>
        <ButtonCustom variant='secondary' size='m' onClick={handleCancel}>
          <Typography variant='l-bold'>Отменить</Typography>
        </ButtonCustom>
        <ButtonCustom variant='primary' size='m' onClick={handleSaved}>
          <Typography variant='l-bold'>Сохранить</Typography>
        </ButtonCustom>
      </div>
    </section>
  );
}
