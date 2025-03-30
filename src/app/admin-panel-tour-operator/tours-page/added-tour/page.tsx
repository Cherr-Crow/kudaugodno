'use client';
import React from 'react';
import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';
import { AddedButton } from '@/shared/ui/added-button';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { NamedInput } from '@/shared/ui/named-input';
import { InputDateForSearchBlock } from '@/shared/ui/search-block/input-date-for-search-block';
import { Select } from '@/shared/ui/select';

export default function AddTourPage() {
  const router = useRouter();
  const [addFlight, setAddFlight] = useState(false);
  const [addHotel, setAddHotel] = useState(false);
  const [dateOfArrived, setdateOfArrived] = useState<string>('');
  const [dateOfLeaving, setdateOfLeaving] = useState<string>('');
  const [countryOfArrived, setCountryOfArrived] = useState<string>('Египет');
  const [cityOfArrived, setCityOfArrived] = useState<string>('Шарм-Эль-Шейх');
  const [choseFlight, setChoseFlight] = useState<string>(
    'SU-12345 Аэрофлот, Москва, DME - Шарм-Эль-Шейх, SSH',
  );
  const [sumOfTickets, setSumOfTickets] = useState<string>('');
  const [choseHotel, setChoseHotel] = useState<string>('The Westist Hotel & Spa');
  const [choseCategory, setChoseCategory] = useState<string>('Standart');
  const [sumOfHotelRooms, setSumOFHotelRooms] = useState<string>('');

  const handleAddFlight = () => {
    setAddFlight(true);
  };
  const handleAddHotel = () => {
    setAddHotel(true);
  };
  const handleDeleteHotel = () => {
    setAddHotel(false);
  };
  const handleDateOfArrived = (val: string) => {
    setdateOfArrived(val);
  };
  const handleDateOfLeaving = (val: string) => {
    setdateOfLeaving(val);
  };
  const handleCountryOfArrived = (val: string) => {
    setCountryOfArrived(val);
  };
  const handleCityOfArrived = (val: string) => {
    setCityOfArrived(val);
  };
  const handleChoseFlight = (val: string) => {
    setChoseFlight(val);
  };
  const handleSumOfTickets = (val: string) => {
    setSumOfTickets(val);
  };
  const handleChoseHotel = (val: string) => {
    setChoseHotel(val);
  };
  const handleChoseCategory = (val: string) => {
    setChoseCategory(val);
  };
  const handleSumOfHotelRooms = (val: string) => {
    setSumOFHotelRooms(val);
  };
  const handleBack = () => {
    router.back();
  };
  const handleSave = async () => {};

  return (
    <div className='w-full'>
      <div>
        <div className='mx-auto mb-0 mt-0 max-w-6xl'>
          <Typography className='text-blue-950' variant='subtitle3'>
            Тур #999
          </Typography>
          <div className='mb-6 mt-5 rounded-2xl border border-grey-100 p-10 shadow-lg'>
            <div className='grid grid-cols-2 grid-rows-2 gap-5'>
              <div className='flex flex-col gap-3'>
                <Typography variant='l-bold'>Дата отъезда</Typography>
                <InputDateForSearchBlock
                  placeholder='12.12.2024'
                  getValue={(val) => handleDateOfLeaving(val as string)}
                  className='rounded-md border border-grey-700 py-5'
                  startValue={dateOfLeaving}
                />
              </div>
              <div className='flex flex-col gap-3'>
                <Typography variant='l-bold'>Дата приезда</Typography>
                <InputDateForSearchBlock
                  placeholder='12.12.2024'
                  getValue={(val) => handleDateOfArrived(val as string)}
                  className='rounded-md border border-grey-700 py-5'
                  startValue={dateOfArrived}
                />
              </div>
              <div className='flex w-full flex-col gap-3'>
                <Typography variant='l'>Страна прибытия</Typography>
                <Select
                  size='small'
                  color='blue'
                  options={['Египет']}
                  className='w-full'
                  getValue={handleCountryOfArrived}
                  startValue={countryOfArrived}
                />
              </div>
              <div className='flex w-full flex-col gap-3'>
                <Typography variant='l'>Город</Typography>
                <Select
                  size='small'
                  color='blue'
                  options={['Шарм-Эль-Шейх']}
                  className='w-full'
                  getValue={handleCityOfArrived}
                  startValue={cityOfArrived}
                />
              </div>
            </div>
            <div className='mt-5'>
              <Typography variant='l'>Рейсы</Typography>
              {addFlight && (
                <div className='grid grid-cols-5 grid-rows-1 items-center gap-5'>
                  <Select
                    size='small'
                    color='blue'
                    options={[
                      'SU-12345 Аэрофлот, Москва, DME - Шарм-Эль-Шейх, SSH  ',
                    ]}
                    className='col-span-3 w-full'
                    getValue={handleChoseFlight}
                    startValue={choseFlight}
                  />
                  <NamedInput
                    name='Билеты'
                    title='Количество билетов'
                    placeholder='0'
                    className='col-span-2'
                    getValue={(val) => handleSumOfTickets(val as string)}
                    startValue={sumOfTickets}
                  />
                </div>
              )}
              <AddedButton
                className='mt-2'
                text='Добавить рейс'
                onClick={handleAddFlight}
              />
            </div>
          </div>
          {addHotel && (
            <div className='mb-6 mt-5 gap-5 rounded-2xl border border-grey-100 p-10 shadow-lg'>
              <div
                className='flex w-fit cursor-pointer justify-self-end'
                onClick={handleDeleteHotel}
              >
                <SvgSprite name='trash-light' width={21} height={21} />
              </div>
              <div className='flex w-full flex-col gap-3'>
                <Typography variant='l'>Отель</Typography>
                <Select
                  size='small'
                  color='blue'
                  options={['The Westist Hotel & Spa']}
                  className='w-full'
                  getValue={handleChoseHotel}
                  startValue={choseHotel}
                />
              </div>
              <div className='mt-5 grid grid-cols-2 grid-rows-1 gap-5'>
                <div className='flex w-full flex-col gap-3'>
                  <Typography variant='l'>Категория номера</Typography>
                  <Select
                    size='small'
                    color='blue'
                    options={['Standart']}
                    className='w-full'
                    getValue={handleChoseCategory}
                    startValue={choseCategory}
                  />
                </div>
                <NamedInput
                  name='Номера'
                  title='Количество номеров'
                  placeholder='0'
                  getValue={(val) => handleSumOfHotelRooms(val as string)}
                  startValue={sumOfHotelRooms}
                />
              </div>
            </div>
          )}
          <AddedButton text='Добавить отель' onClick={handleAddHotel} />
          <div className='mt-6 flex gap-4 justify-self-end'>
            <ButtonCustom variant='secondary' size='l' onClick={handleBack}>
              <Typography variant='l-bold'>Отменить</Typography>
            </ButtonCustom>
            <ButtonCustom variant='primary' size='l' onClick={handleSave}>
              <Typography variant='l-bold'>Сохранить</Typography>
            </ButtonCustom>
          </div>
        </div>
      </div>
    </div>
  );
}
