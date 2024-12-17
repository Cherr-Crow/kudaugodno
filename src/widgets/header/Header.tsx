import React from 'react';
import { IHeader } from './Header.types';

export function Header({ className }: IHeader) {
  return <header className={`${className}`}>Header</header>;
}
