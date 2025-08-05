import { MealType, RoomType } from '@/types/room';

export interface FilterHotelCardsProps {
  rooms: RoomType[];
  availableMeals: MealType[];
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
