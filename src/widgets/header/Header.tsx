import React from 'react';
import { IHeader } from './Header.types';
import { SvgSprite } from '@/shared/svg-sprite';
import Link from 'next/link';
import { Typography } from '@/shared/typography';

export function Header({ className }: IHeader) {
  return (
    <header className={`${className} bg-white-secondary py-4`}>
      <div className='container flex items-center justify-between'>
        <Link href='/'>
          <SvgSprite name='logo' width={65} className='sm:w-[106px]' />
        </Link>
        <div className='hidden gap-3 sm:flex'>
          <Link href='/catalog-tours'>
            <Typography variant='l-bold' children='Туры' />
          </Link>
          <Link href='/catalog-hotels'>
            <Typography variant='l-bold' children='Отели' />
          </Link>
          <Link href='/blog-page'>
            <Typography variant='l-bold' children='Блог' />
          </Link>
        </div>
        <div className='flex items-center gap-3'>
          <div className='hidden cursor-pointer items-center gap-2 sm:flex'>
            <SvgSprite name='phone' width={24} color='#4757EA' />
            <Typography variant='l' className='text-blue-600' children='Поддержка' />
          </div>
          <SvgSprite
            name='bell'
            width={20}
            color='#1a1f4c'
            className='cursor-pointer'
          />
          <div className='flex w-fit cursor-pointer items-center justify-center rounded-full border border-black p-1'>
            <SvgSprite name='user' width={24} color='#1a1f4c' />
          </div>
        </div>
      </div>
    </header>
  );
}
