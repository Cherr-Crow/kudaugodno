import { RoomType } from '@/types/room';

export interface HotelRomsListProps {
  rooms: RoomType[];
  hotelId?: number;
}
