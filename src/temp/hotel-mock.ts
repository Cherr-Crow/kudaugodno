import { Hotel } from '@/types/hotel';

export const hotels: Hotel[] = [
  {
    id: 1,
    name: 'Novotel Nairobi Westlands',
    star_category: 4,
    place: 'Отель',
    country: 'Кения',
    city: 'Найроби',
    address: 'Westlands Road, Найроби',
    description:
      'Отель с просторными номерами, бассейном и утренними завтраками. Удобно расположен в центре города.',
    type_of_rest: 'Семейный',
    user_rating: 7.9,
    check_in_time: '14:00',
    check_out_time: '12:00',
    photo: [
      { id: 1, hotel: 0, photo: 'Novotel-Nairobi-Westlands-photo-1.png' },
      { id: 2, hotel: 0, photo: 'Novotel-Nairobi-Westlands-photo-2.png' },
      { id: 3, hotel: 0, photo: 'Novotel-Nairobi-Westlands-photo-3.png' },
      { id: 4, hotel: 0, photo: 'Novotel-Nairobi-Westlands-photo-4.png' },
      { id: 5, hotel: 0, photo: 'Novotel-Nairobi-Westlands-photo-5.png' },
    ],
    rooms: [
      {
        id: 1,
        category: 'Стандартный номер',
        area: 25,
        amenities_common: ['Wi-Fi'],
        amenities_coffee: ['Wi-Fi'],
        amenities_bathroom: ['Wi-Fi'],
        amenities_view: ['Wi-Fi'],
        single_bed: null,
        double_bed: 1,
        price: 1000,
        type_of_meal: 'полный пансион',
        photo: [
          { id: 1, photo: 'room1.png', room: 0 },
          { id: 2, photo: 'room2.png', room: 0 },
        ],
        number_of_adults: 2,
        number_of_children: 1,
        quantity_rooms: 3,
        discount: [
          {
            id: 1,
            name: 'string',
            size: 10,
            start_date: '10.10.2025',
            end_date: '10.10.2026',
          },
        ],
        unavailable: [
          {
            id: 1,
            reason: 'string',
            start_date: '10.10.2025',
            end_date: '10.10.2026',
          },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        username: 'Константин Константинопольский',
        userPhoto: 'user1-photo.png',
        date: '26.03.2023',
        rating: 8.9,
        text: `Расположение идеальное и близко ко многим хорошим местам, например Sarit entre и Westgate Mall. 
            Завтрак был отличным, с таким количеством вариантов на выбор. 
            Первая линия. Лежаки и полотенца предоставлялись от отеля. СПА чудесный, есть много возможностей для спорта. 
            Очень зеленая территория.`,
      },
    ],
    rules: [
      {
        name: 'Размещение животных',
        description:
          'Можно с животными. Гулять с собаками разрешается в специально отведенных местах',
      },
      {
        name: 'Детская кроватка',
        description:
          'Детская кроватка при необходимости оплачивается отдельно - 500р/ночь. Детский стульчик предоставляется по запросу.',
      },
      {
        name: 'Курение на территории',
        description:
          'Курение на территории отля разрешается только в строго отведённых для этого местах',
      },
      {
        name: 'Отмена бронирования',
        description: 'Отменить бронирование можно за 48 часов до заселения.',
      },
    ],
    distance_to_the_station: null,
    distance_to_the_sea: 0,
    distance_to_the_center: 0,
    distance_to_the_metro: 0,
    distance_to_the_airport: 0,
    amenities_common: [],
    amenities_in_the_room: [],
    amenities_sports_and_recreation: [],
    amenities_for_children: [],
    type_of_meals_ultra_all_inclusive: null,
    type_of_meals_all_inclusive: null,
    type_of_meals_full_board: null,
    type_of_meals_half_board: null,
    type_of_meals_only_breakfast: null,
    is_active: true,
    room_categories: [],
  },
];
