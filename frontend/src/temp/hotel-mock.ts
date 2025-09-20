import { IHotel } from '@/types/hotel';

export const hotels: IHotel[] = [
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
        // type_of_meals: [
        //   {
        //     id: 1,
        //     name: 'Полный пансион',
        //     price: '1000',
        //   },
        // ],
        photo: [
          { id: 1, photo: 'room1.png', room: 0 },
          { id: 2, photo: 'room2.png', room: 0 },
        ],
        number_of_adults: 2,
        number_of_children: 1,
        quantity_rooms: 3,
        rules: [
          {
            name: 'Без детей',
            option: true,
          },
        ],
        calendar_dates: [
          {
            id: 1,
            start_date: '2024-07-01',
            end_date: '2024-07-10',
            available_for_booking: true,
            discount: true,
            discount_amount: '0.2',
            price: '42000',
          },
          {
            id: 2,
            start_date: '2024-07-15',
            end_date: '2024-07-25',
            available_for_booking: true,
            discount: false,
            discount_amount: '0',
            price: '47000',
          },
        ],
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
    is_active: true,
    width: -1.272748,
    longitude: 36.827871,
  },
];
