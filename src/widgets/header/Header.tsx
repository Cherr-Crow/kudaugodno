'use client';

import React, { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { PopupWindow } from '@/shared/popup-window';
import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';

import { IHeader } from './Header.types';

export function Header({ className }: IHeader) {
  const [openUser, setOpenUser] = useState(false);
  const router = useRouter();

  const toggleUserMenu = () => {
    setOpenUser(!openUser);
  };

  return (
    <header className={`${className} bg-grey-50 py-4`}>
      <div className='container flex items-center justify-between'>
        <Link href='/' as='/'>
          <SvgSprite name='logo' width={65} className='sm:w-[106px]' />
        </Link>
        <nav className='hidden gap-3 md:flex'>
          <Link href='/catalog-tours'>
            <Typography variant='l-bold' children='Туры' />
          </Link>
          <Link href='/catalog-hotels'>
            <Typography variant='l-bold' children='Отели' />
          </Link>
          <Link href='/blog-page'>
            <Typography variant='l-bold' children='Блог' />
          </Link>
          <Link href='/roman-n'>
            <Typography
              variant='l-bold'
              children='ПЕРЕИСПОЛЬЗУЕМЫЕ КОМПОНЕНТЫ'
              className='hidden md:flex'
            />
          </Link>
        </nav>
        <div className='flex items-center gap-3'>
          <div className='hidden cursor-pointer items-center gap-2 md:flex'>
            <SvgSprite name='phone' width={24} color='#4757EA' />
            <Typography variant='l' className='text-blue-600' children='Поддержка' />
          </div>
          <SvgSprite
            name='bell'
            width={20}
            color='#1a1f4c'
            className='cursor-pointer'
          />
          <div className='relative'>
            <div
              className='flex w-fit cursor-pointer items-center justify-center rounded-full border border-grey-950 p-1'
              onClick={toggleUserMenu}
            >
              <SvgSprite name='user' width={24} color='#1a1f4c' />
            </div>
            {openUser && (
              <PopupWindow className='absolute right-full flex flex-col gap-2 text-nowrap py-2'>
                <Link
                  href='/auth-page'
                  onClick={toggleUserMenu}
                  className='rounded-xl px-4 py-1 hover:bg-grey-100'
                >
                  <Typography children='user' />
                </Link>
                <Link
                  href='/admin-panel-tour-operator'
                  onClick={toggleUserMenu}
                  className='rounded-xl px-4 py-1 hover:bg-grey-100'
                >
                  <Typography children='tour-operator-panel' />
                </Link>
              </PopupWindow>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
