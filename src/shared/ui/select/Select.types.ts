export interface ISelect {
  className?: string;
  options: string[];
  getValue?: (value: string) => void;
  color?: 'blue' | 'green';
  arrowHidden?: boolean;
  size?: 'small' | 'medium' | 'mobile' | 'meals';
  id?: string;
  startValue?: string;
  onSelect?: (value: string) => void;
}
