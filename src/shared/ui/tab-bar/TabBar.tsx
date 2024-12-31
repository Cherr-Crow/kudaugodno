'use client';

import React, { useState } from 'react';
import { ITabBar } from './TabBar.types';
import { Typography } from '@/shared/typography';
import { nanoid } from 'nanoid';
import { SvgSprite } from '@/shared/svg-sprite';

export function TabBar({ className, tabs, getTabName, svgTab,setTab }: ITabBar) {
  const [active, setActive] = useState(setTab?setTab:tabs[0]);

  const handleTabClick = (tab: string) => {
    setActive(tab);
    getTabName && getTabName(tab);
  };

  return (
    <ul className={`${className} flex w-fit rounded-full bg-green-secondary p-2`}>
      {tabs.map((tab, index) => (
        <li
          key={nanoid()}
          className={`flex cursor-pointer rounded-full bg-transparent px-4 py-1 md:px-10 md:py-4 ${active === tab && 'bg-white text-black'}`}
          onClick={() => handleTabClick(tab)}
        >
          {svgTab && (
            <SvgSprite
              name={svgTab[index]}
              color={` ${active === tab ? 'black' : 'white'}`}
            />
          )}
          <Typography
            children={tab}
            variant='m-bold'
            className={`${svgTab ? 'ml-2' : ''}`}
          />
        </li>
      ))}
    </ul>
  );
}
