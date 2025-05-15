type DivProps = React.ComponentPropsWithoutRef<'div'>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IRoomBedsInfo extends DivProps {}
export interface RoomBedsInfoProps {
  singleBeds: number | null;
  duoBeds: number | null;
  className?: string;
  textSettings?: string;
  iconWidth?: string;
}
