'use client';

import React from 'react';
import { IAdminPanelDashboard } from './AdminPanelDashboard.types';
import { Typography } from '@/shared/typography';
import { nanoid } from 'nanoid';
import { usePathname, useRouter } from 'next/navigation';

const links = [
  { name: 'Профиль', path: '/admin-panel-tour-operator' },
  { name: 'Отели', path: '/admin-panel-tour-operator/hotels' },
  { name: 'Рейсы', path: '/admin-panel-tour-operator/flights' },
  { name: 'Заявки', path: '/admin-panel-tour-operator/applications-page' },
];

export function AdminPanelDashboard({}: IAdminPanelDashboard) {
  const patch = usePathname();
  const routes = useRouter();

  return (
    <ul className='h-full min-w-[180px] rounded-2xl bg-grey-100 p-2'>
      {links.map((link) => (
        <li
          className={`cursor-pointer rounded-2xl px-5 py-4 ${patch === link.path && 'bg-white'}`}
          key={nanoid()}
          onClick={() => routes.push(link.path)}
        >
          <Typography children={link.name} />
        </li>
      ))}
    </ul>
  );
}
