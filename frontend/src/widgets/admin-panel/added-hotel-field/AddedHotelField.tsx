/* eslint-disable no-commented-code/no-commented-code */
'use client';

import React, { useEffect, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import {
  useChangeHotelMutation,
  useDeleteHotelMutation,
  useGetOneHotelQuery,
} from '@/servicesApi/hotelsApi';
import { DistanceBlock } from '@/shared/distance-block/DistanceBlock';
import { Rating } from '@/shared/rating';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { Checkbox } from '@/shared/ui/checkbox';
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
import { AmenitiesChangeBlock } from '@/widgets/amenities-change-block/AmenitiesChangeBlock';

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
  const [district, setDistrict] = useState(''); // район
  const [street, setStreet] = useState(''); // улица, дом
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
  // const [distanceToTheMetro, setDstanceToTheMetro] = useState(
  //   data?.distance_to_the_metro || null,
  // ); // расстояние до метро
  const [distanceToTheAirport, setDstanceToTheAirport] = useState(
    data?.distance_to_the_airport || null,
  ); // расстояние до аэропорта
  const [description, setDescription] = useState(data?.description || ''); // описание
  const [checkInTime, setCheckInTime] = useState(data?.check_in_time || '00:00'); // время заезда
  const [checkOutTime, setCheckOutTime] = useState(data?.check_out_time || '00:00'); // время выезда
  const [amenitiesCommon, setAmenitiesCommon] = useState(amenities_common); // общие удобства
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

  useEffect(() => {
    if (!data?.address) return;

    const [parsedDistrict, ...rest] = data.address.split(', ');
    if (rest.length > 0) {
      setDistrict(parsedDistrict);
      setStreet(rest.join(', '));
    } else {
      setStreet(parsedDistrict);
    }
  }, [data?.address]);

  const handleCancel = () => {
    if (path.includes('added-hotel')) deletHotel(hotelId);
    route.push('/admin-panel-tour-operator/hotels');
  };

  const handleSaved = () => {
    const fullAddress = district ? `${district}, ${street}` : street;

    const _obj: Omit<IHotel, 'rooms' | 'id' | 'reviews' | 'photo'> = {
      name,
      star_category: starCategory,
      place,
      country,
      city,
      address: fullAddress,
      distance_to_the_station: distanceToTheStation,
      distance_to_the_sea: distanceToTheSea,
      distance_to_the_center: distanceToTheCenter,
      // distance_to_the_metro: distanceToTheMetro,
      distance_to_the_airport: distanceToTheAirport,
      description,
      check_in_time: checkInTime,
      check_out_time: checkOutTime,
      amenities_common: amenitiesCommon.map((s) => s.label),
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
      width: Number(latitude),
      longitude: Number(longitude),
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
    <section className='flex flex-col gap-[18px]'>
      <div className='relative flex flex-col'>
        <Typography variant='l-bold'>Название</Typography>
        <input
          type='text'
          className='w-full rounded-lg border border-grey-200 px-3 py-2 text-xl font-light text-grey-950 focus:outline-none focus:ring-1 focus:ring-blue-500'
          placeholder='Введите название отеля'
          value={name}
          onChange={(e) => setName(e.target.value)}
          name='nameHotel'
        />
      </div>
      <div className='flex flex-col gap-[18px]'>
        <div className='flex gap-5'>
          <div className='flex w-full flex-col gap-1'>
            <Typography variant='l-bold'>Тип отдыха</Typography>
            <Select
              options={typeOfHoliday}
              color='blue'
              size='hotelAdd'
              className='w-full text-xl text-blue-950'
              id='select-type-of-holiday'
              getValue={setTypeOfRest}
            />
          </div>
          <div className='flex w-full flex-col gap-1'>
            <Typography variant='l-bold'>Тип размещения</Typography>
            <Select
              options={accommodationType}
              color='blue'
              size='hotelAdd'
              className='w-full text-xl text-blue-950'
              id='select-type-of-placements'
              getValue={setPlace}
            />
          </div>
        </div>
        {(!place || place === 'Отель') && (
          <div className='flex w-full flex-col gap-1'>
            <Typography variant='l-bold'>Категория</Typography>
            <Rating
              category={starCategory}
              starSize={36}
              gap={0}
              setRating={(index) => setStarCategory(index)}
            />
          </div>
        )}
      </div>
      <div className='flex flex-col gap-[18px]'>
        <div className='grid grid-cols-2 gap-x-5 gap-y-[18px]'>
          <NamedInput
            gap='gap-0'
            paddings='py-2 px-3 text-xl'
            placeholder='Введите страну'
            name='country'
            getValue={(val) => setCountry(val as string)}
            title='Страна'
            startValue={country}
          />
          <NamedInput
            gap='gap-0'
            paddings='py-2 px-3 text-xl'
            placeholder='Введите район'
            name='address'
            getValue={(val) => setDistrict(val as string)}
            title='Район (если есть)'
            startValue={district}
          />
          <NamedInput
            gap='gap-0'
            paddings='py-2 px-3 text-xl'
            placeholder='Введите город'
            name='city'
            getValue={(val) => setCity(val as string)}
            title='Город'
            startValue={city}
          />
          <NamedInput
            gap='gap-0'
            paddings='py-2 px-3 text-xl'
            placeholder='Введите адрес'
            name='address'
            getValue={(val) => setStreet(val as string)}
            title='Улица, дом'
            startValue={street}
          />
          <NamedInput
            gap='gap-0'
            paddings='py-2 px-3 text-xl'
            placeholder='Введите широту'
            name='latitude'
            getValue={(val) => setLatitude(val as string)}
            title='Широта'
            startValue={latitude}
          />
          <NamedInput
            gap='gap-0'
            paddings='py-2 px-3 text-xl'
            placeholder='Введите долготу'
            name='longitude'
            getValue={(val) => setLongitude(val as string)}
            title='Долгота'
            startValue={longitude}
          />
        </div>
        <div className='flex flex-col gap-4'>
          <Typography variant='l-bold'>Расстояниe от</Typography>
          <div className='flex w-full justify-between'>
            <DistanceBlock
              label='Аэропорт'
              value={distanceToTheAirport}
              onChange={setDstanceToTheAirport}
            />
            <DistanceBlock
              label='Пляж'
              value={distanceToTheSea}
              onChange={setDstanceToTheSea}
            />
            <DistanceBlock
              label='Центр'
              value={distanceToTheCenter}
              onChange={setDstanceToTheCenter}
            />
            <DistanceBlock
              label='Ж/д станция'
              value={distanceToTheStation}
              onChange={setDstanceToTheStation}
            />
          </div>
        </div>
      </div>
      <div className='mb-[10px] flex w-full flex-col'>
        <Typography variant='l-bold'>Описание</Typography>
        <textarea
          className='min-h-[110px] w-full resize-none rounded-md border border-blue-600 px-3 py-2 text-xl font-light text-grey-950 outline-none focus:outline-none focus:ring-1 focus:ring-blue-500'
          placeholder='Введите описание отеля'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name='description'
        />
      </div>
      {/* <Accordeon title='Питание'>
        <div className='flex gap-2'>
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
      <div className='mb-3'>
        <Typography variant='h4' className='mb-4'>
          Удобства
        </Typography>
        <div className='flex w-full flex-col gap-5'>
          <AmenitiesChangeBlock
            checkboxes={amenitiesCommon}
            getNewList={setAmenitiesCommon}
          />
          <CheckBoxBlock
            title='Общие'
            checkboxes={amenitiesInTheRoom}
            getNewList={setAmenitiesInTheRoom}
          />
          <CheckBoxBlock
            title='Спорт и оттдых'
            checkboxes={amenitiesSportsAndRecreation}
            getNewList={setAmenitiesSportsAndRecreation}
          />
          <CheckBoxBlock
            title='Для детей'
            checkboxes={amenitiesForChildren}
            getNewList={setAmenitiesForChildren}
          />
        </div>
      </div>
      <div className='flex flex-col'>
        <Typography variant='h4' className='mb-3'>
          Правила
        </Typography>
        <div className='mb-5 flex gap-5'>
          <NamedInput
            gap='gap-0'
            className='max-w-[180px]'
            paddings='py-2 px-3 text-xl'
            placeholder='14:00'
            name='checkIn'
            getValue={(val) => setCheckInTime(val as string)}
            title='Заселение'
            type='time'
            startValue={checkInTime}
          />
          <NamedInput
            gap='gap-0'
            className='max-w-[180px]'
            paddings='py-2 px-3 text-xl'
            placeholder='12:00'
            name='checkOut'
            getValue={(val) => setCheckOutTime(val as string)}
            title='Выезд'
            type='time'
            startValue={checkOutTime}
          />
          <Checkbox
            className='mb-3 self-end'
            variant='white'
            label='Доступно раннее заселение'
            // checked={isEarlyCheckIn}
            // onChange={setIsEarlyCheckIn}
          />
        </div>
        <RulesAdd getRules={setRules} oldRules={data?.rules} />
      </div>
      <div>
        <Typography variant='h4' className='mb-[14px]'>
          Фотографии
        </Typography>
        <PhotosHotel />
      </div>
      <div className={`mb-10 mt-3 flex justify-end gap-5`}>
        <ButtonCustom
          variant='secondary'
          size='l'
          onClick={handleCancel}
          className='min-w-[180px]'
        >
          <Typography variant='l-bold'>Отменить</Typography>
        </ButtonCustom>
        <ButtonCustom
          variant='primary'
          size='l'
          onClick={handleSaved}
          className='min-w-[180px]'
        >
          <Typography variant='l-bold'>Сохранить</Typography>
        </ButtonCustom>
      </div>
    </section>
  );
}
