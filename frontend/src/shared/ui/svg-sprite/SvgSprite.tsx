'use client';

import { ISvgSprite } from './SvgSprite.types';

export function SvgSprite({
  className,
  name,
  color,
  width,
  height,
  strokeWidth,
  onClick,
}: ISvgSprite) {
  return (
    <svg
      className={className ?? ''}
      width={width ?? 24}
      height={height ?? 24}
      strokeWidth={strokeWidth}
      onClick={onClick}
      color={color}
    >
      <use href={`/sprite.svg#${name}`} />
      {/* используй строку ниже, чтобы работать с свг - добавляет к названию уникальный префикс, который провоцирует новую прогрузку файла со спрайтами, чтобы видеть изменения сразу */}
      {/* <use href={`/sprite.svg?v=${Date.now()}#${name}`} /> */}
    </svg>
  );
}
