import React, { useEffect, useRef, useState } from 'react';

import { PopupWindow } from '@/shared/popup-window';

import { IContextMenu } from './ContextMenu.types';

export function ContextMenu({ items }: IContextMenu) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const contextMenuRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setIsVisible(true);
    setPosition({ x: event.pageX, y: event.pageY });
  };

  const handleClick = (event: MouseEvent) => {
    contextMenuRef.current && contextMenuRef.current.contains(event.target as Node);
    setIsVisible(false);
  };

  useEffect(() => {
    document.addEventListener('click', (e) => handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <PopupWindow onContextMenu={handleContextMenu}>
      {isVisible && (
        <div
          ref={contextMenuRef}
          style={{
            position: 'absolute',
            top: position.y,
            left: position.x,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
          }}
        >
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {items.map((item, index) => (
              <li
                key={index}
                style={{ padding: '8px 16px', cursor: 'pointer' }}
                onClick={() => {
                  item.action();
                  setIsVisible(false);
                }}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </PopupWindow>
  );
}
