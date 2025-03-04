type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface ISelect extends DivProps {
  className?: string;
  // options: string[];
  options: number;
  getValue?: (value: string) => void;
  color?: 'blue' | 'green';
  // markerChange?: boolean;
  arrowHidden?: boolean;
  size?: 'small' | 'medium' | 'mobile';
  startValue?: string;
}
