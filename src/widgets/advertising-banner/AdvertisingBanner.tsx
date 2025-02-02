import React from 'react';

import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';

import { IAdvertisingBanner } from './AdvertisingBanner.types';

export function AdvertisingBanner({ className }: IAdvertisingBanner) {
  return (
    <section className={`${className} container`}>
      <div className={`relative h-full w-full`}>
        <img
          src='friends-near-lifeguard-tower_mobile.svg'
          alt='friends-near-lifeguard-tower'
          className='z-10 block h-full w-full rounded-[20px] object-cover md:hidden'
        />
        <img
          src='friends-near-lifeguard-tower 1.svg'
          alt='friends-near-lifeguard-tower'
          className='hidden rounded-[20px] object-cover md:block md:h-[320px] md:w-[800px] lg:h-[470px] lg:w-[1483px]'
        />
        <div className='pointer-events-none absolute inset-0 flex flex-col items-center justify-center'>
          <div className="pointer-events-auto absolute inset-0 m-0 flex flex-col items-center justify-center rounded-[40px] bg-center bg-no-repeat p-0 md:ml-32 md:mt-10 md:h-[240px] md:w-[430px] md:bg-[url('/Content.svg')] lg:ml-14 lg:mt-24 lg:h-[284px] lg:w-[430px]">
            <Typography
              variant='h4'
              className='mt-0 p-0 text-white md:mb-3 md:mr-64 md:mt-8 md:text-[32px] md:text-grey-950 lg:mr-60 lg:text-[40px]'
            >
              ТУРЦИЯ
            </Typography>
            <Typography
              variant='m'
              className='mb-4 mt-0 p-0 text-white md:mb-5 md:ml-8 md:mr-52 md:mt-0 md:text-[16px] md:text-grey-950 lg:mr-24 lg:text-[24px]'
            >
              Скидка до 50% при покупке тура сегодня
            </Typography>
            <div className='flex w-full justify-center px-6 md:relative md:mb-9'>
              <ButtonCustom
                variant='secondary'
                size='m'
                className='flex w-full items-center justify-center bg-white text-grey-950'
              >
                <div className='flex items-center justify-center gap-6'>
                  <Typography variant='m-bold' className='text-grey-950'>
                    Подробнее
                  </Typography>
                  <SvgSprite name='arrow-pointer' width={10} />
                </div>
              </ButtonCustom>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
