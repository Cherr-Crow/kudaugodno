'use client';
import React, { useContext, useEffect, useState } from 'react';

import { useGetTourApplicationsQuery } from '@/servicesApi/applicationsApi';
import { FilterYear } from '@/shared/filter-year';
import { Pagination } from '@/shared/pagination';
import { ApplicationCard } from '@/shared/ui/application-card';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';

import { ApplicationsContext } from '../layout';

export default function ApplicationsPage() {
  const [years] = useState<string[]>(['2025']);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const { data = [] } = useGetTourApplicationsQuery({ limit, offset });
  // Контекст для проброса количества заявок
  const { setCountApplications } = useContext(ApplicationsContext);

  useEffect(() => {
    setCountApplications(data.length);
  }, [data, setCountApplications]);

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

        {data && (
          <div className='flex justify-start pt-8'>
            <Pagination
              totalItems={data?.length ?? 0}
              pageSize={limit}
              onChange={(newOffset, newLimit) => {
                setOffset(newOffset);
                setLimit(newLimit);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
