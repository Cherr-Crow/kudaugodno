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

export type RoomType = [
  {
    id: number;
    category: string;
    price: number;
    type_of_meal: string;
    number_of_adults: number;
    number_of_children: number;
    single_bed: number;
    double_bed: number;
    area: number;
    quantity_rooms: number;

    amenities_common: { name: string }[];
    amenities_coffee: { name: string }[];
    amenities_bathroom: { name: string }[];
    amenities_view: { name: string }[];

    discount: {
      name: string;
      size: number;
      start_date: string;
      end_date: string;
    };
    unavailable: {
      reason: string;
      start_date: string;
      end_date: string;
    }[];
    photo: {
      id: number;
      photo: string;
      room_id: number;
    }[];
  },
];
