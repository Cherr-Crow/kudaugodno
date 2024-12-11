import React from 'react';
import { ISvgSprite } from './SvgSprite.types';

export function SvgSprite({ className }: ISvgSprite) {
  return <div className={`${className}`}>SvgSprite</div>;
}
