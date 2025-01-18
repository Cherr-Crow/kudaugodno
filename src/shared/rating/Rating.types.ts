type UlProps = React.ComponentPropsWithoutRef<'ul'>;

export interface IRating extends UlProps {
  category: number;
  setRating?: (arg: number) => void;
}
