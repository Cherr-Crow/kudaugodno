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
    <ul
      className={`${className ?? ''} z-0 flex h-[33px] w-[185px] rounded-full md:h-[48px] md:w-[250px] lg:-ml-2 lg:w-[250px] ${Style[variant]}`}
    >
      {tabs.map((tab, index) => (
        <li
          key={nanoid()}
          className={`relative flex w-full cursor-pointer items-center rounded-full ${active === tab ? 'text-black' : 'text-white'} transition-all duration-300 ease-in-out`}
          onClick={() => handleTabClick(tab)}
        >
          {/* Псевдоэлемент для фона */}
          <span
            className={`duration-600 absolute ${tab === 'Отели' ? 'translate-x-[4px] md:translate-x-[8px] lg:translate-x-[8px]' : ''} inset-0 z-10 w-[89px] transform rounded-full bg-white transition-transform ease-in-out md:h-full md:w-[116px] ${
              active === tab ? 'scale-x-100' : 'scale-x-0'
            } origin-left`}
          />

          <div className='ml-[17px] flex w-full flex-row gap-1 md:ml-[17px]'>
            {/* Иконка SVG */}
            {svgTab && (
              <SvgSprite
                name={svgTab[index]}
                color={`${active === tab ? 'black' : 'white'}`}
                width={21}
                height={21}
                className={`relative z-10 w-4 md:w-7`}
              />
            )}

            {/* Текст */}
            <Typography
              className={`relative z-10 text-sm font-medium md:text-[20px]`}
            >
              {tab}
            </Typography>
          </div>
        </li>
      ))}
    </ul>
  );
}
