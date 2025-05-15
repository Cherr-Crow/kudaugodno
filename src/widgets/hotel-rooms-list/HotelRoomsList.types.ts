import { RoomType } from '@/types/room';

export interface HotelRoomsListProps {
  rooms: RoomType[];
  hotelId?: number;
}
