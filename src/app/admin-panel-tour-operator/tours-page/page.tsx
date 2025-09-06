'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useGetToursQuery } from '@/servicesApi/toursApi';
import { Pagination } from '@/shared/pagination';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { Checkbox } from '@/shared/ui/checkbox';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';
import { TableForTours } from '@/widgets/admin-panel/table-for-tours';

export default function ToursPage() {
  const router = useRouter();
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const { data } = useGetToursQuery({ limit, offset });
  const tours = data?.results;

  const handleAddTour = () => {
    router.push('/admin-panel-tour-operator/tours-page/added-tour');
  };
  const [search, setSearch] = useState('');
  const [showArchived, setShowArchived] = useState(false);

  const filteredTours = (tours ?? []).filter((tour) => {
    const matchesSearch = search.trim()
      ? tour.id.toString().includes(search.toLowerCase()) ||
        (tour.hotel?.name.toLowerCase() || '').includes(search.toLowerCase()) ||
        (tour.arrival_country?.toLowerCase() || '').includes(search.toLowerCase()) ||
        (tour.arrival_city?.toLowerCase() || '').includes(search.toLowerCase())
      : true;

    const matchesArchive = showArchived
      ? tour.is_active === false
      : tour.is_active !== false;

    return matchesSearch && matchesArchive;
  });

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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full outline-none'
            placeholder='Введите идентификатор отеля, название отеля или страну'
          />
        </form>
        <ButtonCustom variant='secondary' size='m' onClick={handleAddTour}>
          <Typography className='text-nowrap'>Добавить тур</Typography>
        </ButtonCustom>
      </div>
      <Checkbox
        label='Показать архивные туры'
        isChecked={showArchived}
        onChange={() => setShowArchived((prev) => !prev)}
        className='my-5'
      />
      {data && <TableForTours tours={filteredTours} />}
      {data && (
        <div className='flex justify-center pt-8'>
          <Pagination
            totalItems={data?.count ?? 0}
            pageSize={limit}
            onChange={(newOffset, newLimit) => {
              setOffset(newOffset);
              setLimit(newLimit);
            }}
          />
        </div>
      )}

      {/* <button className='' popoverTarget='myPopover' popoverTargetAction='toggle'>
        kjhkjhkjh
      </button> */}

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
