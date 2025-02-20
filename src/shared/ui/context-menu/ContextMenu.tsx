import React, { useEffect, useRef, useState } from 'react';

import { Typography } from '@/shared/typography';

import { IContextMenu } from './ContextMenu.types';

export function ContextMenu({ items, visible, positionProp }: IContextMenu) {
  const [isVisible, setIsVisible] = useState(visible);
  const [position, setPosition] = useState(positionProp);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  const handleMouseOut = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    setIsVisible(visible);
    setPosition(positionProp);
  }, [visible, positionProp]);

  return (
    isVisible && (
      <div
        ref={contextMenuRef}
        className='absolute min-w-36 rounded-xl border border-grey-100 bg-white shadow-xl'
        style={{
          top: position.y - 10,
          left: position.x - 10,
        }}
        onMouseLeave={handleMouseOut}
      >
        <ul className='p-2'>
          {items.map((item, index) => (
            <li
              key={index}
              className='cursor-pointer rounded border-b border-b-grey-100 px-7 py-1 last-of-type:border-none hover:bg-grey-100'
              onClick={() => {
                item.action();
                setIsVisible(false);
              }}
            >
              <Typography
                variant='m-bold'
                className={item.label === 'Удалить' ? 'text-red-primary-800' : ''}
              >
                {item.label}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
    )
  );
}
