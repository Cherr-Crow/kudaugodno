import { RoomType } from '@/types/room';

type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IRoomsListForAdminPanel extends DivProps {
  category: string;
  roomsList: RoomType[];
}
