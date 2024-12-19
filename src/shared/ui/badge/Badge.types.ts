type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IBadge extends DivProps {
  size?: 'base' | 'small';
  name: string;
  price?: string;
}
