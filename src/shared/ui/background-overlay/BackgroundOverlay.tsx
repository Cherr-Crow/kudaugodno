import React from 'react';

import { IBackgroundOverlay } from './BackgroundOverlay.types';

export function BackgroundOverlay({
  height = '',
  className = '',
}: IBackgroundOverlay) {
  return (
    <div
      className={`absolute left-0 top-0 -z-10 w-full rounded-bl-[20px] rounded-br-[20px] bg-blue-600 bg-no-repeat md:rounded-bl-[100px] md:rounded-br-[100px] ${className}`}
      style={{ height }}
    />
  );
}

{
  /*  
  Пример использования:
  <BackgroundOverlay
        height='100%'
        className={`bg-[url('/plain.svg')] bg-no-repeat md:h-[80%]`}
        />
  */
}
