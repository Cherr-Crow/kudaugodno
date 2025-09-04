import { IHotel } from '@/types/hotel';
import { RoomType } from '@/types/room';

export interface IHotelCardComponent {
  hotel: IHotel;
  tab: 'Туры' | 'Отели';
  filteredRoom: RoomType;
  searchProps: { nights: string; guests: string };
}
