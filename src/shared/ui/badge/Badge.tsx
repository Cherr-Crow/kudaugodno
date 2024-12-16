import React from 'react';
import { IBadge } from './Badge.types';
import { Typography } from '@/shared/typography';

export function Badge({ className, size = 'base', name, price }: IBadge) {
  return (
    <div
      className={`${className} flex w-full items-center justify-between rounded-xl bg-blue-disabled ${size === 'base' ? 'px-5 py-3' : 'px-3 py-2'} `}
    >
      <Typography children={name} variant={size === 'base' ? 'subtitle4' : 'm'} />
      <Typography children={price} variant={size === 'base' ? 'h5' : 'm-bold'} />
    </div>
  );
}
