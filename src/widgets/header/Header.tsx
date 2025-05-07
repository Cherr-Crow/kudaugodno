'use client';

import React, { useState } from 'react';

import Link from 'next/link';
import { useSelector } from 'react-redux';

import { selectUserId } from '@/rtk/userSlice';
import { useGetUserDataQuery } from '@/servicesApi/userApi';
import { PopupWindow } from '@/shared/ui/popup-window';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';

import { IHeader } from './Header.types';

export function Header({ className }: IHeader) {
  const userId = useSelector(selectUserId);

  const [openUser, setOpenUser] = useState(false);

  const { data: user } = useGetUserDataQuery(undefined, { skip: !userId });

  const toggleUserMenu = () => {
    setOpenUser(!openUser);
  };

  return (
    <header className={`${className} bg-grey-50 py-4`}>
      <div className='container flex items-center justify-between'>
        <Link href='/' as='/' className=''>
          {/*<div className='border border-grey-900'>*/}
          <SvgSprite name='logo' width={65} className='link_hover sm:w-[106px]' />
          {/*</div>*/}
        </Link>
        <nav className='hidden gap-3 md:flex'>
          <Link href='/catalog-tours' className='link_hover'>
            <Typography variant='l-bold'>Туры</Typography>
          </Link>
          <Link className='link_hover' href='/catalog-hotels'>
            <Typography variant='l-bold'>Отели</Typography>
          </Link>
          <Link className='link_hover' href='/blog-page'>
            <Typography variant='l-bold'>Блог</Typography>
          </Link>
          <Link className='link_hover' href='/roman-n'>
            <Typography variant='l-bold' className='hidden md:flex'>
              ПК
            </Typography>
          </Link>
        </nav>
        <div className='flex items-center gap-3'>
          <div className='hidden cursor-pointer items-center gap-2 md:flex'>
            <SvgSprite name='phone' width={24} color='#4757EA' />
            <Typography variant='l' className='text-blue-600'>
              Поддержка
            </Typography>
          </div>
          <a
            href='/company-registration'
            className='hidden items-center gap-1 rounded-lg text-[#4757EA] transition hover:shadow-md focus:shadow-md focus:outline-none focus-visible:shadow-md active:text-grey-950 md:flex'
          >
            <SvgSprite name='for-business' width={24} color='currentColor' />
            <Typography variant='l'>Бизнесу</Typography>
          </a>
          <SvgSprite
            name='bell'
            width={20}
            color='#1a1f4c'
            className='cursor-pointer'
          />
          <div className='relative'>
            <div
              className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-grey-950 p-1`}
              style={{
                backgroundImage: user?.avatar ? `url('${user.avatar}')` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              onClick={toggleUserMenu}
            >
              {!user?.avatar && <SvgSprite name='user' width={24} color='#1a1f4c' />}
            </div>
            {openUser && (
              <PopupWindow className='absolute right-full flex flex-col gap-2 text-nowrap py-2'>
                <Link
                  href='/auth-page'
                  onClick={toggleUserMenu}
                  className='rounded-xl px-4 py-1 hover:bg-grey-100'
                >
                  <Typography>user</Typography>
                </Link>
                <Link
                  href='/admin-panel-tour-operator'
                  onClick={toggleUserMenu}
                  className='rounded-xl px-4 py-1 hover:bg-grey-100'
                >
                  <Typography>tour-operator-panel</Typography>
                </Link>
              </PopupWindow>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
