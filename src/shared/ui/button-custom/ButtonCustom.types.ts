type ButtonProps = React.ComponentPropsWithoutRef<'button'>;

export interface IButtonCustom extends ButtonProps {
  variant: 'primary' | 'secondary' | 'tetriary' | 'danger' | 'wzhuh';
  size: 'l' | 'm' | 's' | 's' | 'lm';
  style?: React.CSSProperties;
  className?: string;
}
