import { RoomType } from '@/types/room';

type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IRoomModal extends DivProps {
  room: RoomType;
}
