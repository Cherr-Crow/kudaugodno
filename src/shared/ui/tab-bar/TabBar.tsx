'use client';

import React, { useState } from 'react';
import { ITabBar } from './TabBar.types';
import { Typography } from '@/shared/typography';
import { nanoid } from 'nanoid';

export function TabBar({ className, tabs, getTabName }: ITabBar) {
  const [active, setActive] = useState(tabs[0]);

  const handleTabClick = (tab: string) => {
    setActive(tab);
    getTabName && getTabName(tab);
  };

  return (
    <ul className={`${className} flex w-fit rounded-full bg-green-secondary p-2`}>
      {tabs.map((tab) => (
        <li
          key={nanoid()}
          className={`bg-transparent cursor-pointer rounded-full px-4 py-1 md:px-10 md:py-4 ${active === tab && 'bg-white'}`}
          onClick={() => handleTabClick(tab)}
        >
          <Typography children={tab} variant='m-bold' />
        </li>
      ))}
    </ul>
  );
}
