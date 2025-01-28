import React from 'react';

import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom/ButtonCustom';

import { ISubscribeToTheNewsletter } from './SubscribeToTheNewsletter.types';

export function SubscribeToTheNewsletter({}: ISubscribeToTheNewsletter) {
  return (
    <section className=''>
      <div className='mb-5 p-5 rounded-t-3xl min-h-[315px] bg-auto bg-no-repeat bg-cover md:p-[55px] lg:px-[10%] lg:pt-[93px]'
      style={{
        backgroundImage: `url('./subsimg.jpg')`,
      }}
      >
        <Typography variant="l" className='tracking-wider mb-2 block font-black text-white md:font-medium md:text-[26px] md:mb-4 lg:text-[40px] lg:mb-8 lg:tracking-wide'>
          Новостная рассылка
        </Typography>
        <Typography className='mb-6 block font-normal text-white md:font-thin md:text-blue-light md:text-[18px] md:pr-[140px] lg:text-[32px] lg:pr-[0px] lg:mb-10 '>
          Подпишитесь, чтобы первыми узнавать о новых турах, скидках и промокодах
        </Typography>
        
        <form
          action=''
          className='mb-2 flex flex-col order-1 md:block'
        >

          <label className='mr-1 mb-1 order-2'>
             <input
                type='text'
                className='text-base font-normal w-[100%]  outline-none h-[55px] rounded-[7px] pl-[15px] md:text-[18px] md:rounded-[25px] md:w-[78%] md:mb-3 lg:text-[20px] md:h-[45px] lg:h-[70px] lg:rounded-[35px] lg:w-[81%] lg:pl-[30px]'
                placeholder='Введите вашу почту'
              />
          </label>

         <ButtonCustom variant='primary' size='m' type='button' className='order-4  h-[70px] px-[35px] py-[7px] w-full md:order-4 md:w-[21%] md:px-[3px] lg:py-[20px] lg:px-[8px] lg:w-[18%]'>
           <Typography children='Подписаться' className='text-base font-semibold text-nowrap md:text-[16px] lg:text-[20px] md:font-normal' />
         </ButtonCustom>
         <Typography className='order-3 mb-5 block font-normal text-white md:text-blue-light md:order-4'>
          Нажимая на кнопку, вы соглашаетесь с политикой обработки персональных данных
        </Typography>
        </form>

      </div>
    </section>
  )
}
