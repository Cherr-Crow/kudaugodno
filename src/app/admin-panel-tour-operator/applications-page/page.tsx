'use client';
import React, { useState } from 'react';

import { useGetTourApplicationsQuery } from '@/servicesApi/applicationsApi';
import { FilterYear } from '@/shared/filter-year';
import { ApplicationCard } from '@/shared/ui/application-card';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';

export default function ApplicationsPage() {
  const [years] = useState<string[]>(['2025']);

  const { data = [] } = useGetTourApplicationsQuery({});
  return (
    <div className='w-full'>
      <div className='flex flex-col'>
        <Typography variant={'h4'} className={'mb-5 mt-5'}>
          Заявки
        </Typography>
        <div className='mb-8 flex w-full flex-col-reverse gap-5 align-middle lg:flex-row lg:justify-between lg:gap-0'>
          <FilterYear yearsArr={years}></FilterYear>
          <form
            action=''
            className='flex w-full rounded-lg border border-grey-100 p-2 lg:w-1/2'
          >
            <SvgSprite name='search' width={24} />
            <input
              type='text'
              className='w-full outline-none'
              placeholder='Введите номер телефона, номер заявки или страну'
            />
          </form>
        </div>
        {data &&
          data.map((item, i) => (
            <ApplicationCard
              key={i}
              application={item}
              tour={item.tour}
              status={item.status}
            ></ApplicationCard>
          ))}
      </div>
    </div>
  );
}
