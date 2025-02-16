type discountType = {
  id: number;
  name: string;
  size: number;
  start_date: string;
  end_date: string;
};

type unavailableType = {
  id: number;
  reason: string;
  start_date: string;
  end_date: string;
};

type photoType = {
  id: number;
  photo: string;
  room: number;
};

export type RoomType = {
  id: number;
  category: string;
  price: number;
  type_of_meal: string;
  number_of_adults: number;
  number_of_children: number;
  single_bed: number | null;
  double_bed: number | null;
  area: number;
  quantity_rooms: number;
  amenities_common: string[];
  amenities_coffee: string[];
  amenities_bathroom: string[];
  amenities_view: string[];
  discount: discountType[];
  unavailable: unavailableType[];
  photo: photoType[];
};
