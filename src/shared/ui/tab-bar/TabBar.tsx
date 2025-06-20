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
      className={`${className ?? ''} ${variant === 'primary' ? '' : 'h-[33px] w-[185px] md:h-[48px] md:w-[250px] lg:-ml-2 lg:w-[250px]'} z-0 flex rounded-full ${Style[variant]}`}
    >
      {tabs.map((tab, index) => (
        <li
          key={nanoid()}
          className={`relative flex w-full cursor-pointer items-center rounded-full ${active === tab ? 'text-black' : 'text-white'} transition-all duration-300 ease-in-out`}
          onClick={() => handleTabClick(tab)}
        >
          {/* Псевдоэлемент для фона */}
          <span
            className={`duration-600 absolute ${tab === 'Отели' ? 'translate-x-[4px] md:translate-x-[8px] lg:translate-x-[8px]' : ''} inset-0 z-10 ${variant === 'primary' ? '' : 'w-[89px md:h-full md:w-[116px]'} transform rounded-full bg-white transition-transform ease-in-out ${
              active === tab ? 'scale-x-100' : 'scale-x-0'
            } origin-left`}
          />

          <div
            className={`flex w-full flex-row gap-1 ${variant === 'primary' ? 'px-[30px] py-1 md:px-10 md:py-4' : 'ml-[17px]'}`}
          >
            {/* Иконка SVG */}
            {svgTab && (
              <SvgSprite
                name={svgTab[index]}
                color={`${active === tab ? 'black' : 'white'}`}
                width={21}
                height={21}
                className={`relative z-10 ${variant === 'primary' ? '' : 'w-4 md:w-7'}`}
              />
            )}

            {/* Текст */}
            <Typography
              className={`${variant === 'primary' ? 'text-grey-950' : 'text-sm md:text-[20px]'} relative z-10 font-medium`}
            >
              {tab}
            </Typography>
          </div>
        </li>
      ))}
    </ul>
  );
}
