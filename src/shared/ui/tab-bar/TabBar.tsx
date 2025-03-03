'use client';

import React, { useState } from 'react';

import { nanoid } from 'nanoid';

import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';

import { ITabBar } from './TabBar.types';

export function TabBar({
  className,
  tabs,
  svgTab,
  setTab,
  getActiveTab,
  variant = 'primary',
}: ITabBar) {
  const [active, setActive] = useState(setTab ? setTab : tabs[0]);

  enum Style {
    primary = 'bg-green-300 p-2',
    secondary = 'border border-white',
  }

  const handleTabClick = (tab: string) => {
    setActive(tab);
    getActiveTab(tab);
  };

  return (
    <ul className={`${className ?? ''} flex w-fit rounded-full ${Style[variant]}`}>
      {tabs.map((tab, index) => (
        <li
          key={nanoid()}
          className={`flex cursor-pointer items-center rounded-full bg-transparent px-4 py-1 md:px-10 md:py-4 ${active === tab && 'bg-white'}`}
          onClick={() => handleTabClick(tab)}
        >
          {svgTab && (
            <SvgSprite
              name={svgTab[index]}
              color={` ${active === tab ? 'black' : 'white'}`}
              width={20}
              height={20}
            />
          )}
          <Typography
            variant='m-bold'
            className={`${svgTab ? 'ml-2' : ''} ${active !== tab && 'text-white'}`}
          >
            {tab}
          </Typography>
        </li>
      ))}
    </ul>
  );
}
