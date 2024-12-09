import React from 'react';
import { ITemplateName } from './TemplateName.types';

export function TemplateName({ className }: ITemplateName) {
  return <div className={`${className}`}>TemplateName</div>;
}
