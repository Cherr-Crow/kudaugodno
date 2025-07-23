import React from 'react';

import Link from 'next/link';

import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';

import { IWzhuh } from './Wzhuh.types';

export function WzhuhBanner({ className }: IWzhuh) {
  return (
    <div className={`${className}`}>
      <div className='mx-auto flex w-full flex-col items-center justify-center gap-8 rounded-[30px] bg-blue-50 py-4 md:flex-row md:justify-start md:gap-[110px] md:rounded-[40px] md:pb-[50px] md:pl-[110px] md:pt-1 lg:gap-[77px] lg:pb-[5px] lg:pl-[80px]'>
        <div className='flex flex-col items-center text-center md:mt-12 md:items-start md:gap-[14px] md:text-start lg:mt-0 lg:gap-[24px] xl:ml-[170px]'>
          <Typography
            variant='h5'
            className='mr-8 text-[22px] md:mr-0 md:pt-[5px] md:text-[30px] lg:pt-[10px] lg:text-[40px] lg:tracking-wide'
          >
            Псс....Не знаете куда и зачем?
          </Typography>
          <Typography
            variant='m'
            className='mb-3 md:mb-0 md:text-[22px] lg:text-[32px]'
          >
            Нажми и отправим куда-угодно
          </Typography>
          <Link
            href='/wzhuh'
            className='rounded-[40px] bg-blue-600 px-7 py-3 hover:bg-blue-500 active:bg-blue-700'
          >
            <div className='flex h-5 w-16 items-center justify-center gap-2 text-[20px] md:h-9 md:w-28 md:text-[40px] lg:h-12'>
              <Typography variant='l-bold' className='text-white'>
                Вжух
              </Typography>
              <SvgSprite name='magic-wand' width={30} color='#fff' />
            </div>
          </Link>
        </div>

        <div className='-mt-10 hidden h-auto w-[161px] md:order-2 md:block md:w-[161px] lg:w-[189px]'>
          <img
            src='/frog_main.png'
            alt='Лягушка с чемоданом'
            className='object-contain'
          />
        </div>
      </div>
    </div>
  );
}
