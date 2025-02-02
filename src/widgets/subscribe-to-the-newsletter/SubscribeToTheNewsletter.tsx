import React from 'react';

import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom/ButtonCustom';

import { ISubscribeToTheNewsletter } from './SubscribeToTheNewsletter.types';

export function SubscribeToTheNewsletter({}: ISubscribeToTheNewsletter) {
  return (
    <section className=''>
      <div
        className='min-h-[315px] rounded-t-3xl bg-auto bg-cover bg-no-repeat p-5 md:p-[55px] lg:px-[10%] lg:pt-[93px]'
        style={{
          backgroundImage: `url('./subsimg.jpg')`,
        }}
      >
        <div className='container'>
          <Typography
            variant='l'
            className='font-grey-950 mb-2 block tracking-wider text-white md:mb-4 md:text-[26px] md:font-medium lg:mb-8 lg:text-[40px] lg:tracking-wide'
          >
            Новостная рассылка
          </Typography>
          <Typography className='mb-6 block font-normal text-white md:pr-[140px] md:text-[18px] md:font-thin md:text-blue-200 lg:mb-10 lg:pr-[0px] lg:text-[32px]'>
            Подпишитесь, чтобы первыми узнавать о новых турах, скидках и промокодах
          </Typography>

          <form action='' className='order-1 mb-2 flex flex-col md:block'>
            <label className='order-2 mb-1 mr-1'>
              <input
                type='text'
                className='h-[55px] w-[100%] rounded-[7px] pl-[15px] text-base font-normal outline-none md:mb-3 md:h-[45px] md:w-[78%] md:rounded-[25px] md:text-[18px] lg:h-[70px] lg:w-[81%] lg:rounded-[35px] lg:pl-[30px] lg:text-[20px]'
                placeholder='Введите вашу почту'
              />
            </label>

            <ButtonCustom
              variant='primary'
              size='m'
              type='button'
              className='order-4 h-[70px] w-full px-[35px] py-[7px] md:order-4 md:w-[21%] md:px-[3px] lg:w-[18%] lg:px-[8px] lg:py-[20px]'
            >
              <Typography
                children='Подписаться'
                className='text-nowrap text-base font-semibold md:text-[16px] md:font-normal lg:text-[20px]'
              />
            </ButtonCustom>
            <Typography className='order-3 mb-5 block font-normal text-white md:order-4 md:text-blue-200'>
              Нажимая на кнопку, вы соглашаетесь с политикой обработки персональных
              данных
            </Typography>
          </form>
        </div>
      </div>
    </section>
  );
}
