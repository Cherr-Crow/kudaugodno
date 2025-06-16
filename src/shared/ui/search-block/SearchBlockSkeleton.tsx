'use client';

import React, { useEffect, useState, useRef } from 'react';

export function SearchBlockSkeleton() {
  const [opacity, setOpacity] = useState(1);
  const direction = useRef(-1);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      setOpacity((prev) => {
        let next = prev + direction.current * 0.02;
        if (next <= 0.5) {
          direction.current = 1;
          next = 0.5;
        } else if (next >= 1) {
          direction.current = -1;
          next = 1;
        }
        return next;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className='flex w-full flex-col items-center gap-3'>
      {/* Десктоп скелетон */}
      <div className='flex w-full flex-col items-center gap-3'>
        <div
          className='hidden h-[48px] w-[248px] rounded-full bg-blue-400 md:flex'
          style={{ opacity, transition: 'opacity 0.1s ease-in-out' }}
        />
        <div
          className='hidden h-[80px] w-full max-w-[1000px] gap-2 rounded-full bg-blue-400 md:flex'
          style={{ opacity, transition: 'opacity 0.1s ease-in-out' }}
        />
      </div>
      {/* Мобильный скелетон */}
      <div className='container grid w-full grid-cols-2 gap-x-4 gap-y-3 p-4 md:hidden'>
        <div
          className='col-span-2 h-14 rounded-lg'
          style={{
            backgroundColor: '#7e9cfb',
            opacity,
            transition: 'opacity 0.1s ease-in-out',
          }}
        />

        <div
          className='col-span-2 h-14 rounded-lg'
          style={{
            backgroundColor: '#7e9cfb',
            opacity,
            transition: 'opacity 0.1s ease-in-out',
          }}
        />

        <div
          className='col-span-2 h-14 rounded-lg'
          style={{
            backgroundColor: '#7e9cfb',
            opacity,
            transition: 'opacity 0.1s ease-in-out',
          }}
        />

        <div
          className='h-14 rounded-lg'
          style={{
            backgroundColor: '#7e9cfb',
            opacity,
            transition: 'opacity 0.1s ease-in-out',
          }}
        />

        <div
          className='h-14 rounded-lg'
          style={{
            backgroundColor: '#7e9cfb',
            opacity,
            transition: 'opacity 0.1s ease-in-out',
          }}
        />

        <div
          className='col-span-2 h-14 rounded-lg'
          style={{
            backgroundColor: '#7e9cfb',
            opacity,
            transition: 'opacity 0.1s ease-in-out',
          }}
        />
      </div>
    </div>
  );
}
