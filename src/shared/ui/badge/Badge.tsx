import React from 'react';
import { IBadge } from './Badge.types';
import { Typography } from '@/shared/typography';

export function Badge({ size = 'base', name, price }: IBadge) {
  return (
    <div
      className={`flex items-center justify-between rounded-xl bg-blue-disabled ${size === 'base' ? 'px-5 py-3' : 'px-3 py-2'} `}
    >
      <Typography children={name} variant={size === 'base' ? 'subtitle4' : 'm'} />
      {price && (
        <Typography children={price} variant={size === 'base' ? 'h5' : 'm-bold'} />
      )}
    </div>
  );
}
