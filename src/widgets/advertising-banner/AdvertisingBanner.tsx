import React from 'react';
import { IAdvertisingBanner } from './AdvertisingBanner.types';

export function AdvertisingBanner({ className }: IAdvertisingBanner) {
  return <div className={`${className}`}>AdvertisingBanner</div>;
}
