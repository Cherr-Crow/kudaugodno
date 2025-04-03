import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';
import { ContextMenu } from '@/shared/ui/context-menu';

import { IApplicationCard } from './Application_card.types';

export function ApplicationCard({}: IApplicationCard) {
  const route = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsVisible(true);
    setPosition({ x: event.pageX, y: event.pageY });
  };
  const menuItems = [
    { label: 'Редактировать', action: () => handleItemClick('Редактировать') },
  ];
  const handleItemClick = (action: string) => {
    switch (action) {
      case 'Редактировать':
        route.push('applications-page/edit-application');
        break;
      default:
        return;
    }
  };
  return (
    <div className='mb-4 flex min-h-[194px] w-full flex-col rounded-[20px] border-e-grey-400 p-5 shadow-xl lg:flex-row lg:justify-between lg:p-5'>
      <div className='lg:w-2/3'>
        <div className='flex w-full items-center justify-between lg:mb-4'>
          <Typography variant='subtitle4'>Иванов Иван | Москва – Турция</Typography>
        </div>
        <Typography variant={'m'}>№123456789</Typography>
        <div className={'gap-4 bg-[#EEF5FF] p-5 lg:mt-10 lg:flex'}>
          <div className={'flex'}>
            <Typography variant={'m-bold'}>Даты:</Typography>
            <Typography variant={'m'}>23.10–28.10</Typography>
          </div>
          <div className={'flex'}>
            <Typography variant={'m-bold'}>Количество: </Typography>
            <Typography variant={'m'}>2 гостей</Typography>
          </div>
          <div className={'flex gap-4'}>
            <div className={'flex'}>
              <Typography variant={'m-bold'}>Отель: </Typography>
              <Typography variant={'m'}>Super puper hotel</Typography>
            </div>
            <div className={'flex'}>
              <Typography variant={'m-bold'}>Перелет: </Typography>
              <Typography variant={'m'}>S7</Typography>
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          'hidden lg:flex lg:w-1/3 lg:flex-col lg:items-end lg:justify-between'
        }
      >
        <div className={'flex items-center justify-end gap-2'}>
          <SvgSprite name={'greenCircle'}></SvgSprite>
          <Typography variant={'m-bold'}>Ожидает подтверждения</Typography>
        </div>
        <div
          onClick={(event) => handleContextMenu(event)}
          className={'cursor-pointer'}
        >
          <SvgSprite name={'ellipsisVertical'}></SvgSprite>
        </div>
      </div>
      <ContextMenu items={menuItems} visible={isVisible} positionProp={position} />
    </div>
  );
}
