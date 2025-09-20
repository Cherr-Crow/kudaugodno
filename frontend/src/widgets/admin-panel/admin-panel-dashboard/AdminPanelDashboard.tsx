'use client';

import React, { useContext } from 'react';

import { nanoid } from 'nanoid';
import { usePathname, useRouter } from 'next/navigation';

import { ApplicationsContext } from '@/app/admin-panel-tour-operator/layout';
import { Typography } from '@/shared/ui/typography';

import { IAdminPanelDashboard } from './AdminPanelDashboard.types';

interface LinkItem {
  name: string;
  path: string;
}

const linksTourOperator: LinkItem[] = [
  { name: 'Профиль', path: '/admin-panel-tour-operator' },
  { name: 'Отели', path: '/admin-panel-tour-operator/hotels' },
  { name: 'Рейсы', path: '/admin-panel-tour-operator/flights' },
  { name: 'Страховки', path: '/admin-panel-tour-operator/insurance' },
  { name: 'Туры', path: '/admin-panel-tour-operator/tours-page' },
  { name: 'Заявки', path: '/admin-panel-tour-operator/applications-page' },
];

const linksHotelier: LinkItem[] = [
  { name: 'Профиль', path: '/admin-panel-hotelier' },
  { name: 'Заявки', path: '/admin-panel-hotelier/applications-page' },
  { name: 'Отели', path: '/admin-panel-hotelier/hotels' },
  { name: 'Номера', path: '/admin-panel-hotelier/rooms' },
];

const linksTourist: LinkItem[] = [
  { name: 'Профиль', path: '/admin-panel-tourist' },
  { name: 'Настройки', path: '/admin-panel-tourist/settings' },
  { name: 'Поездки', path: '/admin-panel-tourist/trips' },
  { name: 'Мои отзывы', path: '/admin-panel-tourist/reviews' },
  { name: 'Документы', path: '/admin-panel-tourist/documents' },
  { name: 'Избранное', path: '/admin-panel-tourist/favorites' },
];

export function AdminPanelDashboard({ type }: IAdminPanelDashboard) {
  const patch = usePathname();
  const routes = useRouter();
  const { countApplications } = useContext(ApplicationsContext);

  let links: LinkItem[];
  switch (type) {
    case 'tourist':
      links = linksTourist;
      break;
    case 'hotelier':
      links = linksHotelier;
      break;
    case 'tour-operator':
      links = linksTourOperator;
      break;
    default:
      links = [];
  }
  return (
    <ul className='h-full min-w-[180px] rounded-2xl bg-grey-100 p-2'>
      {links.map((link) => (
        <li
          key={nanoid()}
          onClick={() => routes.push(link.path)}
          className={`flex cursor-pointer justify-between rounded-2xl px-5 py-4 ${patch === link.path ? 'bg-white text-blue-500' : 'text-blue-950 hover:text-blue-500'} `}
        >
          <Typography>{link.name}</Typography>
          {link.name === 'Заявки' && countApplications > 0 && (
            <Typography>{countApplications}</Typography>
          )}
        </li>
      ))}
    </ul>
  );
}
