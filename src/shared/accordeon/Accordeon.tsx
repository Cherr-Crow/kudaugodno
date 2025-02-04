import React, { useRef, useState } from 'react';

import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';

import { IAccordeon } from './Accordeon.types';

export function Accordeon({ title, children, className }: IAccordeon) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`w-full ${className ?? ''}`}>
      <div
        className='flex justify-between rounded-xl bg-blue-50 p-3'
        onClick={toggleAccordion}
      >
        <Typography variant='h5'> {title}</Typography>

        <SvgSprite
          name='arrow'
          width={20}
          className={`transition-all ${isOpen ? '-rotate-90' : 'rotate-90'}`}
        />
      </div>
      <div
        className='transition-d overflow-hidden duration-500'
        ref={contentRef}
        style={{
          maxHeight: isOpen
            ? `${contentRef.current && contentRef.current.scrollHeight}px`
            : '0',
        }}
      >
        {children}
      </div>
    </div>
  );
}
