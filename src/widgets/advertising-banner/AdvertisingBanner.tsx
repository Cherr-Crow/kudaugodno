import React from 'react';

import { IAdvertisingBanner } from './AdvertisingBanner.types';
import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { SvgSprite } from '@/shared/svg-sprite';

export function AdvertisingBanner({ className }: IAdvertisingBanner) {
  return (
    <section className={`${className} container w-full`}>
      <div className='rounded-3xl bg-[url("/banner_mini.png")] bg-cover py-10 md:bg-[url("/banner.png")] lg:py-24'>
        <div className='mx-auto w-fit text-center md:rounded-3xl md:bg-[url("/banner_content_bg.jpg")] md:p-9 md:py-10 md:text-start lg:ml-16'>
          <Typography variant='h4' className='text-white md:text-grey-950'>
            ТУРЦИЯ
          </Typography>
          <Typography className='text-white md:block md:w-3/4 md:text-grey-950'>
            Скидка до 50% при покупке тура сегодня
          </Typography>
          <ButtonCustom
            variant='secondary'
            size='m'
            className='mt-4 flex w-full items-center justify-center bg-white text-grey-950 md:mt-5'
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
    </section>
  );
}
