'use client';
import React, { useEffect, useState } from 'react';

import { redirect, useSearchParams } from 'next/navigation';

import { FilterYear } from '@/shared/filter-year';
import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';
import { ApplicationInfo } from '@/shared/ui/application-info';
import { Checkbox } from '@/shared/ui/checkbox';

export default function EditApplication() {
  const [years] = useState<string[]>(['Гость 1', 'Гость 2']);
  const idFlight = useSearchParams().get('id');
  useEffect(() => {
    console.log(idFlight);
  }, [idFlight]);
  return (
    <div className=''>
      <div className={'flex flex-col md:flex-row md:justify-between'}>
        <div className='mb-4 flex items-center gap-2'>
          <div
            className={'cursor-pointer'}
            onClick={() => redirect('/admin-panel-tour-operator/applications-page')}
          >
            <SvgSprite name={'back-arrow'} width={40} height={40} />
          </div>
          <div className='flex flex-col gap-2'>
            <Typography variant={'l-bold'}>Иванов Иван | Москва – Турция</Typography>
            <Typography variant={'m'}>№123456789</Typography>
          </div>
        </div>
        <div className='mb-10 flex items-center gap-2'>
          <SvgSprite name={'greenCircle'} />
          <Typography variant={'m-bold'}>Ожидает подтверждения</Typography>
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <div className={'mb-5 text-center'}>
          <Typography variant={'l-bold'}>Данные по туру</Typography>
        </div>
        <div className={'mb-5 text-center'}>
          <Typography variant={'l-bold'}>123 000</Typography>
        </div>
      </div>
      <div className={'mb-8 flex flex-col gap-3 md:flex-row md:flex-wrap'}>
        <ApplicationInfo title={'23.10–28.10'} subtitle={'Даты поездки'} />
        <ApplicationInfo title={'2 гостей'} subtitle={'Даты поездки'} />
        <ApplicationInfo title={'Только завтрак'} subtitle={'Даты поездки'} />
        <ApplicationInfo title={'Super puper hotel'} subtitle={'Даты поездки'} />
        <ApplicationInfo title={'S7'} subtitle={'Даты поездки'} />
        <ApplicationInfo title={'1 номер на двоих'} subtitle={'Даты поездки'} />
        <ApplicationInfo title={'23.10–28.10'} subtitle={'Даты поездки'} />
      </div>
      <Typography variant={'h4'}>Контактные данные</Typography>
      <form
        id='tour-operator-data'
        className='flex flex-col md:flex-row md:flex-wrap'
        action='PUT'
      >
        <div className='mb-4 w-full md:mr-[18px] md:w-[calc((100%-18px)/2)]'>
          <label
            className='mb-2 block text-[20px] font-medium md:mb-1'
            htmlFor='email'
          >
            Email
          </label>
          <input
            id='tour-operator-email'
            className='transition-border w-full rounded-[8px] border border-grey-700 px-2 pb-3 pt-2 duration-300 ease-in-out hover:border-blue-600 focus:border-blue-600 focus:outline-none md:pt-3'
            type='email'
            name='email'
            placeholder='example@gmail.com'
          />
        </div>
        <div className='mb-4 w-full md:w-[calc((100%-18px)/2)]'>
          <label
            className='mb-2 block text-[20px] font-medium md:mb-1'
            htmlFor='phone'
          >
            Телефон
          </label>
          <input
            id='tour-operator-phone'
            className='transition-border w-full rounded-[8px] border border-grey-700 px-2 pb-3 pt-2 duration-300 ease-in-out hover:border-blue-600 focus:border-blue-600 focus:outline-none md:pt-3'
            type='phone'
            name='phone'
            placeholder='+7(9**)*******'
          />
        </div>
      </form>
      <div className={'mb-5'}>
        <Typography variant={'h4'}>Данные гостей</Typography>
      </div>
      <FilterYear yearsArr={years}></FilterYear>
      <form
        id='user-data'
        className='mt-4 flex flex-col md:flex-row md:flex-wrap'
        action='PUT'
      >
        <div className='mb-4 w-full md:mr-[18px] md:w-[calc((100%-18px)/2)]'>
          <label
            className='mb-2 block text-[20px] font-medium md:mb-1'
            htmlFor='name'
          >
            Имя
          </label>
          <input
            id='user-name'
            className='transition-border w-full rounded-[8px] border border-grey-700 px-2 pb-3 pt-2 duration-300 ease-in-out hover:border-blue-600 focus:border-blue-600 focus:outline-none md:pt-3'
            type='input'
            name='name'
            placeholder='Ivan'
          />
        </div>
        <div className='mb-4 w-full md:w-[calc((100%-18px)/2)]'>
          <label
            className='mb-2 block text-[20px] font-medium md:mb-1'
            htmlFor='firstname'
          >
            Фамилия
          </label>
          <input
            id='user-firstname'
            className='transition-border w-full rounded-[8px] border border-grey-700 px-2 pb-3 pt-2 duration-300 ease-in-out hover:border-blue-600 focus:border-blue-600 focus:outline-none md:pt-3'
            type='input'
            name='firstname'
            placeholder='Ivanov'
          />
        </div>
        <div className='mb-4 w-full md:mr-[18px] md:w-[calc((100%-18px)/2)]'>
          <label
            className='mb-2 block text-[20px] font-medium md:mb-1'
            htmlFor='birthday'
          >
            День рождения
          </label>
          <input
            id='user-birthday'
            className='transition-border w-full rounded-[8px] border border-grey-700 px-2 pb-3 pt-2 duration-300 ease-in-out hover:border-blue-600 focus:border-blue-600 focus:outline-none md:pt-3'
            type='date'
            name='birthday'
            placeholder='MM/DD/YYYY'
          />
        </div>
        <div className='mb-4 w-full md:w-[calc((100%-18px)/2)]'>
          <label
            className='mb-2 block text-[20px] font-medium md:mb-1'
            htmlFor='citizenship'
          >
            Гражданство
          </label>
          <input
            id='user-citizenship'
            className='transition-border w-full rounded-[8px] border border-grey-700 px-2 pb-3 pt-2 duration-300 ease-in-out hover:border-blue-600 focus:border-blue-600 focus:outline-none md:pt-3'
            type='string'
            name='citizenship'
            placeholder='Российская Федерация'
          />
        </div>
        <div className='mb-4 w-full md:mr-[18px] md:w-[calc((100%-18px)/2)]'>
          <label
            className='mb-2 block text-[20px] font-medium md:mb-1'
            htmlFor='passport'
          >
            Серия и номер паспорта
          </label>
          <input
            id='user-passport'
            className='transition-border w-full rounded-[8px] border border-grey-700 px-2 pb-3 pt-2 duration-300 ease-in-out hover:border-blue-600 focus:border-blue-600 focus:outline-none md:pt-3'
            type='number'
            name='passport'
            placeholder='256 2889'
          />
        </div>
        <div className='mb-4 w-full md:w-[calc((100%-18px)/2)]'>
          <label
            className='mb-2 block text-[20px] font-medium md:mb-1'
            htmlFor='validity'
          >
            Срок действия
          </label>
          <input
            id='user-validity'
            className='transition-border w-full rounded-[8px] border border-grey-700 px-2 pb-3 pt-2 duration-300 ease-in-out hover:border-blue-600 focus:border-blue-600 focus:outline-none md:pt-3'
            type='date'
            name='validity'
            placeholder='MM/DD/YYYY'
          />
        </div>
      </form>
      <div className='px-[16px] py-[14px] md:px-[14px] md:pb-[17px]'>
        <Typography variant='subtitle3' className='mb-3 inline-block font-medium'>
          Дополнительно
        </Typography>
        <form action='PUT'>
          <div className='mb-3 flex'>
            <Checkbox id='bills' />
            <label className='text-[16px]' htmlFor='bills'>
              Оформление визы
            </label>
          </div>
          <div className='mb-3 flex'>
            <Checkbox id='digest' />
            <label className='text-[16px]' htmlFor='digest'>
              Оформление медицинской страховки
            </label>
          </div>
          <div className='mb-3 flex'>
            <Checkbox id='bookingInfo' />
            <label className='text-[16px]' htmlFor='bookingInfo'>
              Расширенная страховка от невыезда
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
