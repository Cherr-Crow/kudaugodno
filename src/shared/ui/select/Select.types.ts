import { NameSvg } from '../svg-sprite/SvgSprite.types';

export interface ISelect {
  className?: string;
  arrowClass?: string;
  options: string[];
  getValue?: (value: string) => void;
  color?: 'blue' | 'green';
  arrowHidden?: boolean;
  size?:
    | 'default'
    | 'small'
    | 'medium'
    | 'mobile'
    | 'meals'
    | 'settings'
    | 'catalog';
  id?: string;
  startValue?: string;
  onSelect?: (value: string) => void;
  value?: string;
  disabled?: boolean;
  Icon?: NameSvg;
}
