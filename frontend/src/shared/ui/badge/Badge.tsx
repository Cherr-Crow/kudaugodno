import React from 'react';

import { Typography } from '@/shared/ui/typography';

import { IBadge } from './Badge.types';

export function Badge({ size = 'base', name, price }: IBadge) {
  return (
    <div
      className={`flex items-center justify-between rounded-xl bg-blue-50 ${size === 'base' ? 'px-5 py-3' : 'px-3 py-2'} `}
    >
      <Typography variant={size === 'base' ? 'subtitle4' : 'm'}>{name}</Typography>
      {price && (
        <Typography variant={size === 'base' ? 'h5' : 'm-bold'}>{price}</Typography>
      )}
    </div>
  );
}
