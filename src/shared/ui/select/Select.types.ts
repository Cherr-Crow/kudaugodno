export interface ISelect {
  className?: string;
  options: string[];
  getValue?: (value: string) => void;
  color?: 'blue' | 'green';
}
