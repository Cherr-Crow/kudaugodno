'use client';

import { FC } from 'react';

import { useWindowSize } from 'usehooks-ts';

import { SvgSprite } from '@/shared/ui/svg-sprite';

interface SwiperNavButtonsProps {
  onPrev: () => void;
  onNext: () => void;

  positionClass?: string;

  size: string;

  offsetClass?: {
    left: string;
    right: string;
  };

  className?: string;
}

export const SwiperNavButtons: FC<SwiperNavButtonsProps> = ({
  onPrev,
  onNext,
  positionClass = 'absolute left-0 right-0 top-1/2 z-10 hidden -translate-y-1/2 transform justify-between md:flex',
  size,
  offsetClass = { left: 'ml-4', right: 'mr-4' },
  className = '',
}) => {
  const { width } = useWindowSize();

  const getIconSize = (): number => {
    if (width >= 1280) return 32;
    if (width >= 768) return 24;
    return 16;
  };

  const buttonBaseStyle =
    'flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.6)] text-blue-600 shadow-md hover:opacity-80 active:bg-blue-600 active:text-white';

  const renderIcon = (direction: 'left' | 'right') => (
    <SvgSprite
      name='arrow'
      width={getIconSize()}
      height={getIconSize()}
      strokeWidth={2}
      className={direction === 'left' ? 'rotate-180' : ''}
    />
  );

  return (
    <div className={positionClass}>
      <button
        className={`${offsetClass.left} ${buttonBaseStyle} ${size} ${className}`}
        onClick={onPrev}
      >
        {renderIcon('left')}
      </button>
      <button
        className={`${offsetClass.right} ${buttonBaseStyle} ${size} ${className}`}
        onClick={onNext}
      >
        {renderIcon('right')}
      </button>
    </div>
  );
};
