'use client';

import { useState } from 'react';

import { nanoid } from 'nanoid';

import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';

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
          className='text-black relative flex cursor-pointer items-center rounded-full px-4 py-1 pr-5 transition-all duration-300 ease-in-out md:px-10 md:py-4 md:pr-[41px]'
          onClick={() => handleTabClick(tab)}
        >
          {/* Псевдоэлемент для фона */}
          <span
            className={`duration-600 absolute inset-0 z-0 h-full transform rounded-full bg-white transition-transform ease-in-out ${
              active === tab ? 'scale-x-100' : 'scale-x-0'
            } origin-left`}
          />

          {/* Иконка SVG */}
          {svgTab && (
            <SvgSprite
              name={svgTab[index]}
              color={`${active === tab ? 'black' : 'white'}`}
              width={20}
              height={20}
              className='z-5 relative'
            />
          )}

          {/* Текст */}
          <Typography
            variant='m-bold'
            className={`${svgTab ? 'ml-2' : ''} z-5 relative`}
          >
            {tab}
          </Typography>
        </li>
      ))}
    </ul>
  );
}
