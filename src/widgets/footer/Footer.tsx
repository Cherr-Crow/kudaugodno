import React from 'react';
import { IFooter } from './Footer.types';
import Link from 'next/link';
import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';

export function Footer({ className }: IFooter) {
  return (
    <footer className={`${className} bg-white-secondary py-4 lg:py-12`}>
      <div className='container'>
        <div className='flex justify-between gap-24'>
          <Link href='/'>
            <SvgSprite name='logo' width={64} className='sm:w-[106px]' />
          </Link>
          <nav className='grid grid-cols-[0.5fr_1fr] gap-2 lg:flex lg:items-center lg:gap-6'>
            <Link href='/about-us'>
              <Typography children='О нас' className='md:text-xl lg:font-medium' />
            </Link>
            <Link href='/stocks'>
              <Typography children='Акции' className='md:text-xl lg:font-medium' />
            </Link>
            <Link href='/catalog-tours'>
              <Typography children='Туры' className='md:text-xl lg:font-medium' />
            </Link>
            <Link href='/loyalty-program'>
              <Typography
                children='Программа Лояльности'
                className='md:text-xl lg:font-medium'
              />
            </Link>
            <Link href='/catalog-hotels'>
              <Typography children='Отели' className='md:text-xl lg:font-medium' />
            </Link>
            <Link href='/faq'>
              <Typography
                children='Вопрос – Ответ'
                className='md:text-xl lg:font-medium'
              />
            </Link>
            <Link href='/blog-page'>
              <Typography children='Блог' className='md:text-xl lg:font-medium' />
            </Link>
          </nav>
        </div>
        <div className='flex flex-col gap-1 border-b border-blue-300 py-4 lg:items-end lg:gap-3 lg:py-12'>
          <div className='flex gap-2'>
            <SvgSprite name='mail' width={17} />
            <Typography children='KudaYgodno@gmail.com' />
          </div>
          <div className='flex gap-2'>
            <SvgSprite name='phone' width={17} />
            <Typography children='+7 (900) 000-00-00' />
          </div>
          <div className='flex gap-2'>
            <SvgSprite name='telegram' width={17} />
            <Typography children='@KudaYgodno' />
          </div>
        </div>
        <div className='grid justify-between gap-2 pt-4 lg:flex lg:pt-12'>
          <Typography
            children='Copyright © КудаУгодно @ 2024. Все права защищены.'
            variant='s'
            className='order-2 text-grey-600 lg:order-1 lg:text-base'
          />
          <div className='order-1 flex flex-col gap-2 lg:order-2 lg:flex-row lg:gap-12'>
            <a href='#' className=''>
              <Typography children='Пользовательское соглашение' />
            </a>
            <a href='#' className=''>
              <Typography children='Обработка персональных данных' />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
