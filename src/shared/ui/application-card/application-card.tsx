import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { ContextMenu } from '@/shared/ui/context-menu';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';

import { IApplicationCard } from './application-card.types';

export function ApplicationCard({ tour, application }: IApplicationCard) {
  const route = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [, setSelectedApplication] = useState<number>(0);
  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsVisible(true);
    setPosition({ x: event.pageX, y: event.pageY });
    console.log(event.target);
    setSelectedApplication(0);
  };
  const menuItems = [
    {
      label: 'Редактировать',
      action: () => handleItemClick('Редактировать'),
    },
  ];
  useEffect(() => {
    console.log(application);
  });
  const handleItemClick = (action: string) => {
    switch (action) {
      case 'Редактировать':
        route.push(`applications-page/edit-application`);
        break;
      default:
        return;
    }
  };
  return (
    <>
      <div className='mb-4 flex min-h-[194px] w-full flex-col rounded-[20px] border-e-grey-400 p-5 shadow-xl lg:flex-row lg:justify-between lg:p-5'>
        <div className='lg:w-2/3'>
          <div className='flex w-full items-center justify-between lg:mb-4'>
            <Typography variant='subtitle4'>{`${application.quantity_guests[0].firstname} ${application.quantity_guests[0].lastname} | ${tour.departure_city} – ${tour.arrival_city}`}</Typography>
          </div>
          <Typography variant={'m'}>{`№ ${tour.id}`}</Typography>
          <div className={'gap-4 rounded-[20px] bg-[#EEF5FF] p-5 lg:mt-10 lg:flex'}>
            <div className={'flex'}>
              <Typography variant={'m-bold'}>Даты:</Typography>
              <Typography variant={'m'}>
                {`${tour.start_date} - ${tour.end_date}`}
              </Typography>
            </div>
            <div className={'flex'}>
              <Typography variant={'m-bold'}>Количество: </Typography>
              <Typography variant={'m'}>
                {application.quantity_guests.length} гостей
              </Typography>
            </div>
            <div className={'flex gap-4'}>
              <div className={'flex'}>
                <Typography variant={'m-bold'}>Отель: </Typography>
                <Typography variant={'m'}>{tour.hotel.name}</Typography>
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
            <Typography variant={'m-bold'}>{application.status}</Typography>
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
    </>
  );
}
