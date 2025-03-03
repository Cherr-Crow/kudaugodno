import { RoomType } from '@/types/room';

type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IRoomForAdminPanel extends DivProps {
  room: RoomType;
}
