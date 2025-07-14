import React from 'react';

import Link from 'next/link';

import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';

import { IFooter } from './Footer.types';

export function Footer({ className }: IFooter) {
  return (
    <footer className={`${className} bg-grey-50`}>
      <div className='container py-5 md:py-2 lg:py-9'>
        <div className='flex justify-between gap-12 border-b border-blue-300 pb-3 md:pb-6 lg:border-none'>
          <div className='flex flex-col gap-5 pt-2 md:gap-6'>
            <Link href='/'>
              <SvgSprite
                name='logo'
                width={65}
                strokeWidth={4}
                className='lg:hidden'
              />
              <SvgSprite
                name='logo'
                width={108}
                height={50}
                strokeWidth={4}
                className='hidden lg:block'
              />
            </Link>
            <div className='flex flex-col gap-2 pl-1 md:gap-1 lg:hidden'>
              <a
                href='mailto:KudaYgodno@gmail.com'
                aria-label='Написать на почту'
                className='flex gap-2'
              >
                <SvgSprite name='mail' width={17} />
                <Typography className='md:text-[13px]'>
                  KudaYgodno@gmail.com
                </Typography>
              </a>
              <a
                href='tel:+79000000000'
                aria-label='Позвонить'
                className='flex gap-2'
              >
                <SvgSprite name='phone' width={17} className='scale-x-[-1]' />
                <Typography className='md:text-[13px]'>
                  +7 (900) 000-00-00
                </Typography>
              </a>
              <a
                href='https://t.me/KudaYgodno'
                aria-label='Написать в Telegram'
                target='_blank'
                className='flex gap-2'
              >
                <SvgSprite name='telegram' width={17} />
                <Typography className='md:text-[13px]'>@KudaYgodno</Typography>
              </a>
            </div>
          </div>

          <nav className='flex flex-col gap-2 md:max-h-[140px] md:flex-wrap md:gap-x-[100px] md:gap-y-[6px] md:pr-2 md:pt-3 lg:mt-2 lg:flex-row lg:flex-nowrap lg:gap-x-10 lg:gap-y-0'>
            <Link href='/about-us'>
              <Typography className='lg:text-xl lg:font-medium'>О нас</Typography>
            </Link>
            <Link href='/catalog-tours'>
              <Typography className='lg:text-xl lg:font-medium'>Туры</Typography>
            </Link>
            <Link href='/catalog-hotels'>
              <Typography className='lg:text-xl lg:font-medium'>Отели</Typography>
            </Link>
            <Link href='/blog'>
              <Typography className='lg:text-xl lg:font-medium'>Блог</Typography>
            </Link>
            <Link href='/stocks' className='md:mb-1'>
              <Typography className='lg:text-xl lg:font-medium'>Акции</Typography>
            </Link>
            <Link href='/faq' className='md:mb-2'>
              <Typography className='lg:text-xl lg:font-medium'>
                Вопрос – Ответ
              </Typography>
            </Link>
            <Link href='/loyalty-program'>
              <Typography className='inline-block !leading-[20px] md:max-w-[104px] lg:max-w-none lg:text-xl lg:font-medium lg:!leading-[28px]'>
                Программа лояльности
              </Typography>
            </Link>
          </nav>
        </div>

        <div className='hidden flex-col gap-1 border-b border-blue-300 py-4 lg:flex lg:items-end lg:gap-3 lg:pb-8 lg:pt-3'>
          <a
            href='mailto:KudaYgodno@gmail.com'
            aria-label='Написать на почту'
            className='flex gap-2'
          >
            <SvgSprite name='mail' width={17} />
            <Typography>KudaYgodno@gmail.com</Typography>
          </a>
          <a href='tel:+79000000000' aria-label='Позвонить' className='flex gap-2'>
            <SvgSprite name='phone' width={17} />
            <Typography>+7 (900) 000-00-00</Typography>
          </a>
          <a
            href='https://t.me/KudaYgodno'
            aria-label='Написать в Telegram'
            target='_blank'
            className='flex gap-2'
          >
            <SvgSprite name='telegram' width={17} />
            <Typography>@KudaYgodno</Typography>
          </a>
        </div>

        <div className='flex flex-col-reverse items-center justify-around gap-2 pt-3 md:flex-row md:items-start md:justify-between md:pt-[10px] lg:pt-[26px]'>
          <div className='flex flex-col items-center md:items-start md:gap-7 lg:gap-2'>
            <Typography
              variant='s'
              className='block pb-2 text-grey-800 lg:text-base'
            >
              Copyright © КудаУгодно @ 2024. Все права защищены.
            </Typography>
            <div className='flex items-center gap-3 text-grey-950'>
              <Typography variant='m' className='text-grey-800 lg:text-[20px]'>
                Сделано в
              </Typography>
              <SvgSprite name='logo-god' width={152} height={30} />
            </div>
          </div>

          <div className='flex flex-col gap-2 pb-1 text-center md:gap-[6px] md:pr-4 md:text-start lg:flex-row lg:gap-16 lg:pr-0'>
            <a href='#' className=''>
              <Typography>Оферта</Typography>
            </a>
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
