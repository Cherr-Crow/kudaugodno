'use client';

import React, { useEffect, useState } from 'react';

import { nanoid } from 'nanoid';
import Link from 'next/link';
import { useScreen } from 'usehooks-ts';

import { HotelCard } from '@/entities/hotel-card';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';
import { IHotel } from '@/types/hotel';

import { IHotOffer } from './HotOffer.types';

export function HotOffer({ className, title, link, array, type }: IHotOffer) {
  const [workArr, setWorkArr] = useState<IHotel[]>(array);
  const screen = useScreen();

  useEffect(() => {
    if (screen.width <= 1024 && screen.width > 640) {
      setWorkArr(array.slice(0, 2));
    } else {
      setWorkArr(array);
    }
  }, [screen, array]);

  return (
    <section className={className}>
      <div className='mb-6 flex items-center justify-between'>
        {title && (
          <Typography variant='m-bold' className='md:text-2xl'>
            {title}
          </Typography>
        )}
        {link && (
          <div className='hidden items-center gap-2 md:flex'>
            <Link href={link}>
              <Typography variant='m-bold' className='md:text-2xl'>
                Смотреть больше
              </Typography>
            </Link>
            <SvgSprite name='arrow' width={24} />
          </div>
        )}
      </div>
      <ul className='grid gap-5 md:grid-cols-2 lg:grid-cols-3'>
        {type === 'hotel' &&
          workArr.map((hotel) => (
            <li className='' key={nanoid()}>
              <HotelCard hotel={hotel} />
            </li>
          ))}
      </ul>
      {link && (
        <div className='mt-4 flex items-center justify-end gap-2 md:hidden'>
          <Link href={link}>
            <Typography variant='m-bold' className='md:text-2xl'>
              Смотреть больше
            </Typography>
          </Link>
          <SvgSprite name='arrow' width={24} />
        </div>
      )}
    </section>
  );
}
