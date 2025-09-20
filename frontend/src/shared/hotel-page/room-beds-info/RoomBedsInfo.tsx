/* eslint-disable import/order */
import React from 'react';

import { SvgSprite } from '@/shared/ui/svg-sprite';
// eslint-disable-next-line import/order
import { Typography } from '@/shared/ui/typography';

import { RoomBedsInfoProps } from './RoomBedsInfo.types';

export const RoomBedsInfo: React.FC<RoomBedsInfoProps> = ({
  singleBeds,
  duoBeds,
  className,
  textSettings,
  iconWidth,
}) => {
  const pluralRules = new Intl.PluralRules('ru-RU');

  const bedForms = {
    one: 'кровать',
    few: 'кровати',
    many: 'кроватей',
    other: 'кроватей',
    zero: 'кроватей',
    two: 'кровати',
  };

  const adjForms = {
    one: 'спальная',
    few: 'спальные',
    many: 'спальных',
    other: 'спальных',
    zero: 'спальных',
    two: 'спальные',
  };

  function getBedsDeclination(count: number, typeOfBed: 'одно' | 'дву'): string {
    const rule = pluralRules.select(count);
    const bedWord = bedForms[rule];
    const adjWord = adjForms[rule];
    return `${count} ${typeOfBed + adjWord} ${bedWord}`;
  }

  return (
    <>
      {singleBeds && (
        <div className={`flex items-center ${!duoBeds ? className : 'md:mb-1'}`}>
          <SvgSprite
            className={`mr-2 w-6 text-blue-950 ${iconWidth ? iconWidth : 'md:w-[30px]'}`}
            name='single-bed'
          />
          <Typography
            variant='m'
            className={`text-blue-950 md:max-w-[136px] ${textSettings}`}
          >
            {getBedsDeclination(singleBeds, 'одно')}
          </Typography>
        </div>
      )}
      {duoBeds && (
        <div className={`flex items-center ${className}`}>
          <SvgSprite
            className={`mr-2 w-6 ${iconWidth ? iconWidth : 'md:w-[30px]'}`}
            name='sofa'
            color='#1a1f4c'
          />
          <Typography
            variant='m'
            className={`text-blue-950 md:max-w-[123px] ${textSettings}`}
          >
            {getBedsDeclination(duoBeds, 'дву')}
          </Typography>
        </div>
      )}
    </>
  );
};
