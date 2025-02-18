type DivProps = React.ComponentPropsWithoutRef<'div'>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IRoomDescription extends DivProps {}
export interface RoomDescriptionProps {
  description: string;
}
