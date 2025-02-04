export type room = {
  id: number;
  category: {
    // id: number;   удалил id категории номера
    name: string;
  };
  food: {
    reservation_available_without_meals: boolean;
    type_of_meals: string;
    cost_day: number;
  };
  smoking: boolean;
  pet: boolean;
  area: number;
  amenities: {
    // id: number;
    name: string;
  }[];
  capacity: number;
  single_bed: number | null;
  double_bed: number | null;
  nightly_price: number;
  photos: {
    id: number;
    photo: string;
  }[];
};
