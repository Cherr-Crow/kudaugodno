type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface ISelect extends DivProps {
  className?: string;
  options: string[] | number;
  getValue?: (value: string) => void;
  color?: 'blue' | 'green';
  arrowHidden?: boolean;
  size?: 'small' | 'medium' | 'mobile';
  startValue?: string;
}
