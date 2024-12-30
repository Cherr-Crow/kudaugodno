export interface ISelect {
  className?: string;
  options: string[];
  getValue?: (value: string) => void;
  color?: 'blue' | 'green';
  markerChange?: boolean;
  arrowHidden?: boolean;
  size?: 'small' | 'medium';
  id?: string;
}
