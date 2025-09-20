import { RoomType } from '@/types/room';

export const newRoom: Omit<RoomType, 'id' | 'photo'> = {
  category: '',
  // price: 1,
  // type_of_meals: [
  //   {
  //     id: 1,
  //     name: 'Без питания',
  //     price: '0',
  //   },
  // ],
  number_of_adults: 1,
  number_of_children: 0,
  single_bed: 0,
  double_bed: 0,
  area: 1,
  quantity_rooms: 1,
  // discount: [],
  // unavailable: [],
  amenities_common: [],
  amenities_coffee: [],
  amenities_bathroom: [],
  amenities_view: [],
  rules: [],
  calendar_dates: [],
};
