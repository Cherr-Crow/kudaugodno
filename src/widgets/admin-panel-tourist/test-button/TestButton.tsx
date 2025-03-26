'use client';
import { useState } from 'react';

import Link from 'next/link';

import { PopupWindow } from '@/shared/popup-window';
import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';

// Компонент для тестирования (навигирования) по личному кабинету пользователя-туриста. Далее можно убрать кнопку, оставить только выпадающее меню

export function TestButton({}) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleUserMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='relative text-right'>
      <ButtonCustom
        variant='wzhuh'
        size='m'
        className='text-white'
        onClick={toggleUserMenu}
      >
        <Typography variant='s-bold'>Личный кабинет тест-меню</Typography>
      </ButtonCustom>
      {isMenuOpen && (
        <PopupWindow className='absolute right-0 flex min-w-[200px] flex-col gap-2 text-nowrap py-2 text-left'>
          <Link
            href='/admin-panel-tourist/trips'
            onClick={toggleUserMenu}
            className='rounded-xl px-4 py-1 hover:bg-grey-100 hover:font-semibold'
          >
            <Typography>Поездки</Typography>
          </Link>

          <Link
            href='/admin-panel-tourist/personal-data'
            onClick={toggleUserMenu}
            className='rounded-xl px-4 py-1 hover:bg-grey-100 hover:font-semibold'
          >
            <Typography>Личные данные</Typography>
          </Link>

          <Link
            href='/admin-panel-tourist/simplify-booking'
            onClick={toggleUserMenu}
            className='rounded-xl px-4 py-1 hover:bg-grey-100 hover:font-semibold'
          >
            <Typography>Упростить бронирование</Typography>
          </Link>

          <Link
            href='/admin-panel-tourist/favorites'
            onClick={toggleUserMenu}
            className='rounded-xl px-4 py-1 hover:bg-grey-100 hover:font-semibold'
          >
            <Typography>Избранное</Typography>
          </Link>

          <Link
            href='/admin-panel-tourist/reviews'
            onClick={toggleUserMenu}
            className='rounded-xl px-4 py-1 hover:bg-grey-100 hover:font-semibold'
          >
            <Typography>Мои отзывы и статьи</Typography>
          </Link>

          <Link
            href='/admin-panel-tourist/loyalty-program'
            onClick={toggleUserMenu}
            className='rounded-xl px-4 py-1 hover:bg-grey-100 hover:font-semibold'
          >
            <Typography>Программа Лояльности</Typography>
          </Link>

          <Link
            href='/admin-panel-tourist/settings'
            onClick={toggleUserMenu}
            className='rounded-xl px-4 py-1 hover:bg-grey-100 hover:font-semibold'
          >
            <Typography>Настройки</Typography>
          </Link>

          <Link
            href='/admin-panel-tourist/out'
            onClick={toggleUserMenu}
            className='rounded-xl px-4 py-1 hover:bg-grey-100 hover:font-semibold'
          >
            <Typography>Выйти</Typography>
          </Link>
        </PopupWindow>
      )}
    </div>
  );
}
