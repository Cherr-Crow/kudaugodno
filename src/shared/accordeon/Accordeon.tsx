import React, { useEffect, useRef, useState } from 'react';

import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';

import { IAccordeon } from './Accordeon.types';

export function Accordeon({
  title,
  children,
  className,
  opened = false,
}: IAccordeon) {
  const [isOpen, setIsOpen] = useState(opened);
  const contentRef = useRef<HTMLDivElement>(null);
  const maxHeigth = useRef('');

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!contentRef.current) return;
    maxHeigth.current = contentRef.current.scrollHeight + 'px';
  }, []);

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
          maxHeight: isOpen ? `${maxHeigth.current}` : '0',
        }}
      >
        {children}
      </div>
    </div>
  );
}
