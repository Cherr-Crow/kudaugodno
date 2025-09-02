'use client';

import React from 'react';

import { nanoid } from 'nanoid';
import { usePathname, useRouter } from 'next/navigation';

import { Typography } from '@/shared/ui/typography';

import { IAdminPanelDashboard } from './AdminPanelDashboard.types';

const linksTourOperator = [
  { name: 'Профиль', path: '/admin-panel-tour-operator' },
  { name: 'Отели', path: '/admin-panel-tour-operator/hotels' },
  { name: 'Рейсы', path: '/admin-panel-tour-operator/flights' },
  { name: 'Страховки', path: '/admin-panel-tour-operator/insurance' },
  { name: 'Туры', path: '/admin-panel-tour-operator/tours-page' },
  { name: 'Заявки', path: '/admin-panel-tour-operator/applications-page' },
];

const linksTourist = [
  { name: 'Профиль', path: '/admin-panel-tourist/profile' },
  { name: 'Настройки', path: '/admin-panel-tourist/settings' },
  { name: 'Поездки', path: '/admin-panel-tourist/trips' },
  { name: 'Мои отзывы', path: '/admin-panel-tourist/reviews' },
  { name: 'Документы', path: '/admin-panel-tourist/documents' },
  { name: 'Избранное', path: '/admin-panel-tourist/favorites' },
];

export function AdminPanelDashboard({ type }: IAdminPanelDashboard) {
  const patch = usePathname();
  const routes = useRouter();
  const links = type === 'tourist' ? linksTourist : linksTourOperator;
  return (
    <ul className='h-full min-w-[180px] rounded-2xl bg-grey-100 p-2'>
      {links.map((link) => (
        <li
          className={`cursor-pointer rounded-2xl px-5 py-4 ${patch === link.path && 'bg-white'}`}
          key={nanoid()}
          onClick={() => routes.push(link.path)}
        >
          <Typography>{link.name}</Typography>
        </li>
      ))}
    </ul>
  );
}
