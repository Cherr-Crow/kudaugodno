type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IRoomCard extends DivProps {
  name: string;
  description: string;
  quadrature: string;
  amenities: string;
  price: number;
  image: string[];
  hasChild?: boolean;
}
