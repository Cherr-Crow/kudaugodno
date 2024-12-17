import React from 'react';
import { IHero } from './Hero.types';

export function Hero({ className }: IHero) {
  return <div className={`${className}`}>Hero</div>;
}
