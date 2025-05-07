import React from 'react';

import { ButtonCustom } from '@/shared/ui/button-custom';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';

import { IWzhuh } from './Wzhuh.types';

export function Wzhuh({ className }: IWzhuh) {
  return (
    <div className={`${className}`}>
      <div className='mx-auto flex flex-col items-center justify-center gap-8 rounded-3xl bg-blue-50 p-5 md:flex-row md:justify-start md:gap-28 md:pt-0'>
        <div className='flex flex-col items-center text-center md:items-start md:text-start xl:ml-[170px]'>
          <Typography
            variant='h5'
            className='mb-1 md:text-[30px] lg:mb-6 lg:text-[40px]'
          >
            Псс....Не знаете куда и зачем?
          </Typography>
          <Typography
            variant='m'
            className='mb-2 md:text-[22px] lg:mb-6 lg:text-[32px]'
          >
            Нажми и отправим куда-угодно
          </Typography>
          <ButtonCustom variant='wzhuh' size='m'>
            <div className='flex h-5 w-16 items-center justify-center gap-2 text-[20px] md:h-9 md:w-28 md:text-[40px] lg:h-12'>
              <Typography variant='l-bold' className='text-white'>
                Вжух
              </Typography>
              <SvgSprite name='magic-wand' width={30} color='#fff' />
            </div>
          </ButtonCustom>
        </div>

        <div className='-mt-10 hidden md:order-2 md:block'>
          <img
            src='/frog_main.png'
            alt='Лягушка с чемоданом'
            className='md:h-100 h-auto w-auto object-contain'
          />
        </div>
      </div>
    </div>
  );
}
