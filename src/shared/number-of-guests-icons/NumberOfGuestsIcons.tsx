'use client';

import { useEffect, useState } from 'react';

import { INumberOfGuestsIconsProps } from './NumberOfGuestsIconsProps.types';
import { SvgSprite } from '../ui/svg-sprite';
import { Typography } from '../ui/typography';

export const NumberOfGuestsIcons = ({
  numOfAdults,
  numOfChildren,
  className,
  isCardLocation = false,
}: INumberOfGuestsIconsProps) => {
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    const updateIsLg = () => {
      const turningPoint = isCardLocation ? 1280 : 840;
      setIsLg(window.innerWidth >= turningPoint);
    };

    updateIsLg();

    window.addEventListener('resize', updateIsLg);
    return () => window.removeEventListener('resize', updateIsLg);
  }, [isCardLocation]);

  if (!numOfAdults) return null;

  return (
    <div
      className={`flex items-center text-blue-950 ${isCardLocation ? 'gap-2 md:flex-col' : 'md:gap-1'} ${className}`}
    >
      <div className='flex'>
        {Array.from({ length: numOfAdults }).map((_, i) => (
          <SvgSprite
            key={`adult-${i}`}
            width={isCardLocation ? (isLg ? 18 : 12) : isLg ? 14 : 12}
            height={isCardLocation ? (isLg ? 28 : 25) : isLg ? 28 : 22}
            name={'guest-adult'}
          />
        ))}
      </div>

      {numOfChildren && (
        <>
          <Typography className={`block px-1 ${isCardLocation ? 'md:hidden' : ''} `}>
            +
          </Typography>
          <div className='flex'>
            {Array.from({ length: numOfChildren }).map((_, i) => (
              <SvgSprite
                key={`child-${i}`}
                width={isCardLocation ? (isLg ? 18 : 14) : isLg ? 18 : 14}
                height={isCardLocation ? (isLg ? 22 : 18) : isLg ? 22 : 16}
                name={'guest-child'}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
