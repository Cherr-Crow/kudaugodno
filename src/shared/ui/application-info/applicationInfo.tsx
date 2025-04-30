import React from 'react';

import { Typography } from '@/shared/typography';

import { IApplicationInfo } from './applicationInfo.types';

export function ApplicationInfo({ title, subtitle }: IApplicationInfo) {
  return (
    <div className='flex w-full flex-col items-center justify-center rounded-3xl bg-blue-100 p-4 md:w-fit'>
      <div>
        <Typography variant={'h3'}>{title}</Typography>
      </div>
      <div>
        <Typography variant={'l'}>{subtitle}</Typography>
      </div>
    </div>
  );
}
