import { ReactNode } from 'react';

import { NameSvg } from '@/shared/ui/svg-sprite/SvgSprite.types';

export interface IOurAdvantages {
  className?: string;
  children: ReactNode;
}

export interface IAdvantage {
  title: string;
  description: string;
  icon: NameSvg;
}
