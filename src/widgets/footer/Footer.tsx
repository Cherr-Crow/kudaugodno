import React from 'react';
import { IFooter } from './Footer.types';

export function Footer({ className }: IFooter) {
  return <footer className={`${className}`}>Footer</footer>;
}
