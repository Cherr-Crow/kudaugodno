import React from 'react';

import Link from 'next/link';

import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';

import { IFooter } from './Footer.types';

export function Footer({ className }: IFooter) {
  return (
    <footer className={`${className} bg-grey-50 py-4 lg:py-12`}>
      <div className='container'>
        <div className='flex justify-between gap-24'>
          <Link href='/'>
            <SvgSprite name='logo' width={64} className='sm:w-[106px]' />
          </Link>
          <nav className='grid grid-cols-[0.5fr_1fr] gap-2 lg:flex lg:items-center lg:gap-6'>
            <Link href='/about-us'>
              <Typography className='md:text-xl lg:font-medium'>О нас</Typography>
            </Link>
            <Link href='/stocks'>
              <Typography className='md:text-xl lg:font-medium'>Акции</Typography>
            </Link>
            <Link href='/catalog-tours'>
              <Typography className='md:text-xl lg:font-medium'>Туры</Typography>
            </Link>
            <Link href='/loyalty-program'>
              <Typography className='md:text-xl lg:font-medium'>
                Программа Лояльности
              </Typography>
            </Link>
            <Link href='/catalog-hotels'>
              <Typography className='md:text-xl lg:font-medium'>Отели</Typography>
            </Link>
            <Link href='/faq'>
              <Typography className='md:text-xl lg:font-medium'>
                Вопрос – Ответ
              </Typography>
            </Link>
            <Link href='/blog-page'>
              <Typography className='md:text-xl lg:font-medium'>Блог</Typography>
            </Link>
          </nav>
        </div>
        <div className='flex flex-col gap-1 border-b border-blue-300 py-4 lg:items-end lg:gap-3 lg:py-12'>
          <div className='flex gap-2'>
            <SvgSprite name='mail' width={17} />
            <Typography>KudaYgodno@gmail.com</Typography>
          </div>
          <div className='flex gap-2'>
            <SvgSprite name='phone' width={17} />
            <Typography>+7 (900) 000-00-00</Typography>
          </div>
          <div className='flex gap-2'>
            <SvgSprite name='telegram' width={17} />
            <Typography>@KudaYgodno</Typography>
          </div>
        </div>
        <div className='grid justify-between gap-2 pt-4 lg:flex lg:pt-12'>
          <Typography
            variant='s'
            className='order-2 text-grey-600 lg:order-1 lg:text-base'
          >
            Copyright © КудаУгодно @ 2024. Все права защищены.
          </Typography>
          <div className='order-1 flex flex-col gap-2 lg:order-2 lg:flex-row lg:gap-12'>
            <a href='#' className=''>
              <Typography>Пользовательское соглашение</Typography>
            </a>
            <a href='#' className=''>
              <Typography>Обработка персональных данных</Typography>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
