'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { useGetToursQuery } from '@/servicesApi/toursApi';
import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { Checkbox } from '@/shared/ui/checkbox';
import { TableForTours } from '@/widgets/admin-panel/table-for-tours';

export default function ToursPage() {
  const { data } = useGetToursQuery({});
  const router = useRouter();
  const handleAddTour = () => {
    router.push('/admin-panel-tour-operator/tours-page/added-tour');
  };

  return (
    <div className='w-full'>
      <div className='flex w-full justify-between'>
        <form
          action=''
          className='flex w-3/4 gap-3 rounded-lg border border-grey-100 p-2'
        >
          <SvgSprite name='search' width={24} />
          <input
            type='text'
            className='w-full outline-none'
            placeholder='Введите идентификатор тура, или его название'
          />
        </form>
        <ButtonCustom variant='secondary' size='m' onClick={handleAddTour}>
          <Typography className='text-nowrap'>Добавить тур</Typography>
        </ButtonCustom>
      </div>
      <Checkbox label='Показать архивные туры' className='my-5' />
      {data && <TableForTours tours={data} />}

      <button className='' popoverTarget='myPopover' popoverTargetAction='toggle'>
        kjhkjhkjh
      </button>

      <div
        className='bg-grey-50 px-10 backdrop-blur backdrop:bg-grey-400'
        popover=''
        id='myPopover'
      >
        jhgjhgjhghj
      </div>
    </div>
  );
}
