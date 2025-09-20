type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IDistanceInput extends DivProps {
  options: string[];
  getDistance: (arg: { location: string; distance: number }) => void;
  reset?: boolean;
}
