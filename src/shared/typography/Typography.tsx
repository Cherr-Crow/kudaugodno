import React from 'react';

import { ITypography } from './Typography.types';

export function Typography({ className, children, variant }: ITypography) {
  switch (variant) {
    case 'h1':
      return (
        <h1 className={`${className ?? ''} text-3xl font-medium xl:text-6xl`}>
          {children}
        </h1>
      );
    case 'h2':
      return (
        <h2 className={`${className ?? ''} text-5xl font-medium`}>{children}</h2>
      );
    case 'h3':
      return (
        <h3 className={`${className ?? ''} text-[40px] font-medium`}>{children}</h3>
      );
    case 'h4':
      return (
        <h4 className={`${className ?? ''} text-[32px] font-semibold`}>
          {children}
        </h4>
      );
    case 'h5':
      return (
        <h5 className={`${className ?? ''} text-2xl font-medium`}>{children}</h5>
      );
    case 'subtitle1':
      return <span className={`${className ?? ''} text-5xl`}>{children}</span>;
    case 'subtitle2':
      return <span className={`${className ?? ''} text-[40px]`}>{children}</span>;
    case 'subtitle3':
      return <span className={`${className ?? ''} text-[32px]`}>{children}</span>;
    case 'subtitle4':
      return <span className={`${className ?? ''} text-2xl`}>{children}</span>;
    case 'l':
      return <span className={`${className ?? ''} text-xl`}>{children}</span>;
    case 's':
      return <span className={`${className ?? ''} text-[13px]`}>{children}</span>;
    case 'xs':
      return <span className={`${className ?? ''} text-[11px]`}>{children}</span>;
    case 'l-bold':
      return (
        <span className={`${className ?? ''} text-xl font-medium`}>{children}</span>
      );
    case 'm-bold':
      return (
        <span className={`${className ?? ''} text-base font-medium`}>
          {children}
        </span>
      );
    case 's-bold':
      return <span className={`${className ?? ''} font-medium`}>{children}</span>;
    default:
      return <span className={`${className ?? ''} text-base`}>{children}</span>;
  }
}
