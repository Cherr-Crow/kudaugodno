'use client';
import { useState } from 'react';

import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';
import { Checkbox } from '@/shared/ui/checkbox';

export function TourOperatorProfile() {
  const [isMenuVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div className='mx-auto md:mx-0 md:w-full'>
      <Typography
        variant='l-bold'
        className='mb-7 block text-[20px] font-semibold md:hidden'
      >
        Профиль
      </Typography>

      <div className='mb-7 rounded-[20px] border-2 border-grey-50 px-[16px] py-[17px] shadow-lg md:mb-[18px] md:px-[14px] md:pb-[18px] md:pr-[19px] md:pt-[21px]'>
        <div className='relative mb-4 flex justify-between md:mb-[21px]'>
          <div>
            <Typography
              variant='h1'
              className='mb-1 block text-[24px] md:mb-3 md:text-[32px]'
            >
              Основная информация
            </Typography>
            <Typography variant='m' className='text-grey-800 md:text-[20px]'>
              Данные о&nbsp;туроператоре будем отображать на&nbsp;сайте
            </Typography>
          </div>
          <button
            className='self-start rounded-[12px] bg-grey-50 px-2 py-2 transition-colors duration-300 ease-in-out hover:bg-grey-200 focus:bg-grey-200 focus:outline-none md:rounded-[20px] md:px-[18px] md:py-[18px]'
            onClick={() => setIsVisible(!isMenuVisible)}
          >
            <SvgSprite name='more' className='' />
          </button>
          {isMenuVisible && (
            <div className='z-1 absolute right-0 top-11 rounded-[20px] border-2 border-grey-50 bg-white shadow-lg md:top-[3.75rem]'>
              <button className='rounded-[20px] px-4 py-2 text-left hover:bg-grey-200 focus:bg-grey-200 focus:outline-none md:w-[215px] md:px-5 md:py-3'>
                Редактировать
              </button>
            </div>
          )}
        </div>
        <form
          id='tour-operator-data'
          className='flex flex-col md:flex-row md:flex-wrap'
          action='PUT'
        >
          <div className='mb-4 w-full md:mr-[18px] md:w-[calc((100%-18px)/2)]'>
            <label
              className='mb-2 inline-block text-[20px] font-medium md:mb-1'
              htmlFor='name'
            >
              Название туроператора
            </label>
            <input
              id='tour-operator-name'
              className='transition-border w-full rounded-[8px] border border-grey-700 px-2 pb-3 pt-2 duration-300 ease-in-out hover:border-blue-600 focus:border-blue-600 focus:outline-none md:pt-3'
              type='text'
              name='name'
              placeholder='Введите название туроператора'
            />
          </div>
          <div className='mb-4 w-full md:w-[calc((100%-18px)/2)]'>
            <label
              className='mb-2 inline-block text-[20px] font-medium md:mb-1'
              htmlFor='address'
            >
              Адрес
            </label>
            <input
              id='tour-operator-address'
              className='transition-border w-full rounded-[8px] border border-grey-700 px-2 pb-3 pt-2 duration-300 ease-in-out hover:border-blue-600 focus:border-blue-600 focus:outline-none md:pt-3'
              type='text'
              name='address'
              placeholder='Введите адрес туроператора'
            />
          </div>
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
          <div className='w-full'>
            <label
              className='mb-2 block text-[20px] font-medium md:mb-1'
              htmlFor='descr'
            >
              Краткое описание
            </label>
            <textarea
              id='tour-operator-descr'
              className='transition-border block min-h-[87px] w-full rounded-[8px] border border-grey-700 px-3 pb-3 pt-3 duration-300 ease-in-out hover:border-blue-600 focus:border-blue-600 focus:outline-none md:pt-3'
              name='descr'
              placeholder='Здесь можете ввести описание'
            ></textarea>
          </div>
        </form>
      </div>

      <div className='mb-7 rounded-[20px] border-2 border-grey-50 px-[16px] pb-[16px] pt-[21px] shadow-lg md:hidden'>
        <div className='mb-4 flex justify-between'>
          <Typography variant='l-bold' className='text-[24px]'>
            Пользователи
          </Typography>
          <button className='self-start rounded-[10px] bg-grey-50 px-2 py-2 transition-colors duration-300 ease-in-out hover:bg-grey-200 focus:bg-grey-200 focus:outline-none'>
            <SvgSprite name='more' className='' />
          </button>
        </div>
        <form id='tour-operator-users' action='PUT'>
          <label
            className='mb-1 block text-[20px] font-medium'
            htmlFor='tour-operator-user-name'
          >
            Имя
          </label>
          <input
            id='tour-operator-user-name'
            className='transition-border mb-3 w-full rounded-[10px] border border-grey-700 px-3 py-3 duration-300 ease-in-out hover:border-blue-600 focus:border-blue-600 focus:outline-none'
            type='text'
            placeholder='Иван'
          />
          <label
            className='mb-1 block text-[20px] font-medium'
            htmlFor='tour-operator-user-surname'
          >
            Фамилия
          </label>
          <input
            id='tour-operator-user-surname'
            className='transition-border mb-4 w-full rounded-[10px] border border-grey-700 px-3 py-3 duration-300 ease-in-out hover:border-blue-600 focus:border-blue-600 focus:outline-none'
            type='text'
            placeholder='Иванов'
          />
          <label
            className='mb-1 block text-[20px] font-medium'
            htmlFor='tour-operator-user-email'
          >
            Email
          </label>
          <input
            id='tour-operator-user-email'
            className='transition-border mb-3 w-full rounded-[10px] border border-grey-700 px-3 py-3 duration-300 ease-in-out hover:border-blue-600 focus:border-blue-600 focus:outline-none'
            type='email'
            placeholder='example@gmail.com'
          />
          <label
            className='mb-1 block text-[20px] font-medium'
            htmlFor='tour-operator-user-phone'
          >
            Телефон
          </label>
          <input
            id='tour-operator-user-phone'
            className='transition-border mb-3 w-full rounded-[10px] border border-grey-700 px-3 py-3 duration-300 ease-in-out hover:border-blue-600 focus:border-blue-600 focus:outline-none'
            type='phone'
            placeholder='+7(9**)*******'
          />
          <label
            className='mb-1 block text-[20px] font-medium'
            htmlFor='tour-operator-user-role'
          >
            Роль
          </label>
          <input
            id='tour-operator-user-role'
            className='transition-border w-full rounded-[10px] border border-grey-700 px-3 py-3 duration-300 ease-in-out hover:border-blue-600 focus:border-blue-600 focus:outline-none'
            type='text'
            placeholder='Мастер'
          />
        </form>
      </div>

      <div className='rounded-[20px] border-2 border-grey-50 px-[16px] py-[14px] shadow-lg md:px-[14px] md:pb-[17px]'>
        <Typography variant='subtitle3' className='mb-3 inline-block font-medium'>
          Рассылки
        </Typography>
        <form action='PUT'>
          <div className='mb-3 flex'>
            <Checkbox id='bills' />
            <label className='text-[16px]' htmlFor='bills'>
              Сверки и счета
            </label>
          </div>
          <div className='mb-3 flex'>
            <Checkbox id='digest' />
            <label className='text-[16px]' htmlFor='digest'>
              Дайджест
            </label>
          </div>
          <div className='mb-3 flex'>
            <Checkbox id='bookingInfo' />
            <label className='text-[16px]' htmlFor='bookingInfo'>
              Информация о бронированиях
            </label>
          </div>
          <div className='flex'>
            <Checkbox id='bookingNotices' />
            <label className='text-[16px]' htmlFor='bookingNotices'>
              Смс-уведомления о бронированиях
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
