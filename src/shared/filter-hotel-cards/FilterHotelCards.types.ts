import { RoomType } from '@/types/room';

export interface FilterHotelCardsProps {
  rooms: RoomType[];
  selectedFilters: {
    category: string[];
    meals: string[];
    guests: number[];
  };
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<{
      category: string[];
      meals: string[];
      guests: number[];
    }>
  >;
}
