type DivProps = React.ComponentPropsWithoutRef<'div'>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IRoomArea extends DivProps {}
export interface RoomAreaProps {
  area: number | null;
  className?: string;
  textSettings?: string;
  iconWidth?: string;
}
