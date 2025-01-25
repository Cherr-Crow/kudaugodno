import { Hotel } from '@/types/hotel';

export const hotels: Hotel[] = [
  {
    id: 1,
    name: 'Novotel Nairobi Westlands',
    star_category: 4,
    place: 'Отель',
    amenities: [
      {
        id: 1,
        category_name: 'Общие',
        amenity: [
          'Много зелени',
          'Первая линия',
          'Семейные номера',
          'Трансфер от аэропорта',
          'Ресторан аля-карт',
          'Лобби-бар',
        ],
      },
      {
        id: 2,
        category_name: 'В номере',
        amenity: [
          'Можно с животными',
          'Wi-fi',
          'Террасса',
          'Чайная станция',
          'Рабочий стол',
          'Кресло',
        ],
      },
      {
        id: 3,
        category_name: 'Спорт и отдых',
        amenity: [
          'СПА',
          '2 бассейна',
          '3 теннисных корта',
          'Фитнес-центр',
          'Настольный теннис ',
          'Бильярд ',
        ],
      },
      {
        id: 4,
        category_name: 'Для детей',
        amenity: [
          'Аквапарк',
          'Детский клуб',
          'Вечерняя анимация',
          'Детская площадка',
        ],
      },
    ],
    country: 'Кения',
    city: 'Найроби',
    address: 'Westlands Road, Найроби',
    distances: [{ location: 'sea', distance: 100 }],
    description:
      'Отель с просторными номерами, бассейном и утренними завтраками. Удобно расположен в центре города.',
    type_of_rest: 'Семейный',
    user_rating: 8.6,
    dates: null,
    check_in_time: '14:00',
    check_out_time: '12:00',
    photos: [
      { id: 1, photo: 'Novotel-Nairobi-Westlands-photo-1.png' },
      { id: 2, photo: 'Novotel-Nairobi-Westlands-photo-2.png' },
      { id: 3, photo: 'Novotel-Nairobi-Westlands-photo-3.png' },
      { id: 4, photo: 'Novotel-Nairobi-Westlands-photo-4.png' },
      { id: 5, photo: 'Novotel-Nairobi-Westlands-photo-5.png' },
    ],
    rooms: [
      {
        id: 1,
        category: { id: 1, name: 'Стандартный номер' },
        food: {
          reservation_available_without_meals: true,
          type_of_meals: 'Завтрак включен',
          cost_day: 1000,
        },
        smoking: false,
        pet: false,
        area: 25,
        amenities: [
          { id: 1, name: 'Wi-Fi' },
          { id: 2, name: 'Телевизор' },
        ],
        capacity: 2,
        single_bed: null,
        double_bed: 1,
        nightly_price: 5000,
        photos: [
          { id: 1, photo: 'room1.png' },
          { id: 2, photo: 'room2.png' },
        ],
      },
      {
        id: 2,
        category: { id: 2, name: 'Люкс' },
        food: {
          reservation_available_without_meals: true,
          type_of_meals: 'Завтрак включен',
          cost_day: 1000,
        },
        smoking: false,
        pet: false,
        area: 50,
        amenities: [
          { id: 1, name: 'Wi-Fi' },
          { id: 2, name: 'Мини-бар' },
          { id: 3, name: 'Джакузи' },
        ],
        capacity: 4,
        single_bed: null,
        double_bed: 2,
        nightly_price: 10000,
        photos: [
          { id: 3, photo: 'room3.png' },
          { id: 4, photo: 'room4.png' },
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
      {
        id: 2,
        username: 'Константин Константинопольский',
        userPhoto: 'user1-photo.png',
        date: '26.03.2023',
        rating: 8.9,
        text: `Расположение идеальное и близко ко многим хорошим местам, например Sarit entre и Westgate Mall. 
            Завтрак был отличным, с таким количеством вариантов на выбор. 
            Первая линия. Лежаки и полотенца предоставлялись от отеля. СПА чудесный, есть много возможностей для спорта. 
            Очень зеленая территория.`,
      },
      {
        id: 3,
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
  },
  {
    id: 2,
    name: 'Novotel Nairobi Westlands',
    star_category: 4,
    place: 'Отель',
    amenities: [
      {
        id: 1,
        category_name: 'Общие',
        amenity: [
          'Много зелени',
          'Первая линия',
          'Семейные номера',
          'Трансфер от аэропорта',
          'Ресторан аля-карт',
          'Лобби-бар',
        ],
      },
      {
        id: 2,
        category_name: 'В номере',
        amenity: [
          'Можно с животными',
          'Wi-fi',
          'Террасса',
          'Чайная станция',
          'Рабочий стол',
          'Кресло',
        ],
      },
      {
        id: 3,
        category_name: 'Спорт и отдых',
        amenity: [
          'СПА',
          '2 бассейна',
          '3 теннисных корта',
          'Фитнес-центр',
          'Настольный теннис ',
          'Бильярд ',
        ],
      },
      {
        id: 4,
        category_name: 'Для детей',
        amenity: [
          'Аквапарк',
          'Детский клуб',
          'Вечерняя анимация',
          'Детская площадка',
        ],
      },
    ],
    country: 'Кения',
    city: 'Найроби',
    address: 'Westlands Road, Найроби',
    distances: [{ location: 'sea', distance: 100 }],
    description:
      'Отель с просторными номерами, бассейном и утренними завтраками. Удобно расположен в центре города.',
    type_of_rest: 'Семейный',
    user_rating: 8.6,
    dates: null,
    check_in_time: '14:00',
    check_out_time: '12:00',
    photos: [
      { id: 1, photo: 'Novotel-Nairobi-Westlands-photo-1.png' },
      { id: 2, photo: 'Novotel-Nairobi-Westlands-photo-2.png' },
      { id: 3, photo: 'Novotel-Nairobi-Westlands-photo-3.png' },
      { id: 4, photo: 'Novotel-Nairobi-Westlands-photo-4.png' },
      { id: 5, photo: 'Novotel-Nairobi-Westlands-photo-5.png' },
    ],
    rooms: [
      {
        id: 1,
        category: { id: 1, name: 'Стандартный номер' },
        food: {
          reservation_available_without_meals: true,
          type_of_meals: 'Завтрак включен',
          cost_day: 1000,
        },
        smoking: false,
        pet: false,
        area: 25,
        amenities: [
          { id: 1, name: 'Wi-Fi' },
          { id: 2, name: 'Телевизор' },
        ],
        capacity: 2,
        single_bed: null,
        double_bed: 1,
        nightly_price: 5000,
        photos: [
          { id: 1, photo: 'room1.png' },
          { id: 2, photo: 'room2.png' },
        ],
      },
      {
        id: 2,
        category: { id: 2, name: 'Люкс' },
        food: {
          reservation_available_without_meals: true,
          type_of_meals: 'Завтрак включен',
          cost_day: 1000,
        },
        smoking: false,
        pet: false,
        area: 50,
        amenities: [
          { id: 1, name: 'Wi-Fi' },
          { id: 2, name: 'Мини-бар' },
          { id: 3, name: 'Джакузи' },
        ],
        capacity: 4,
        single_bed: null,
        double_bed: 2,
        nightly_price: 10000,
        photos: [
          { id: 3, photo: 'room3.png' },
          { id: 4, photo: 'room4.png' },
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
      {
        id: 2,
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
  },
  {
    id: 3,
    name: 'Novotel Nairobi Westlands',
    star_category: 4,
    place: 'Отель',
    amenities: [
      {
        id: 1,
        category_name: 'Общие',
        amenity: [
          'Много зелени',
          'Первая линия',
          'Семейные номера',
          'Трансфер от аэропорта',
          'Ресторан аля-карт',
          'Лобби-бар',
        ],
      },
      {
        id: 2,
        category_name: 'В номере',
        amenity: [
          'Можно с животными',
          'Wi-fi',
          'Террасса',
          'Чайная станция',
          'Рабочий стол',
          'Кресло',
        ],
      },
      {
        id: 3,
        category_name: 'Спорт и отдых',
        amenity: [
          'СПА',
          '2 бассейна',
          '3 теннисных корта',
          'Фитнес-центр',
          'Настольный теннис ',
          'Бильярд ',
        ],
      },
      {
        id: 4,
        category_name: 'Для детей',
        amenity: [
          'Аквапарк',
          'Детский клуб',
          'Вечерняя анимация',
          'Детская площадка',
        ],
      },
    ],
    country: 'Кения',
    city: 'Найроби',
    address: 'Westlands Road, Найроби',
    distances: [{ location: 'sea', distance: 100 }],
    description:
      'Отель с просторными номерами, бассейном и утренними завтраками. Удобно расположен в центре города.',
    type_of_rest: 'Семейный',
    user_rating: 8.6,
    dates: null,
    check_in_time: '14:00',
    check_out_time: '12:00',
    photos: [
      { id: 1, photo: 'Novotel-Nairobi-Westlands-photo-1.png' },
      { id: 2, photo: 'Novotel-Nairobi-Westlands-photo-2.png' },
      { id: 3, photo: 'Novotel-Nairobi-Westlands-photo-3.png' },
      { id: 4, photo: 'Novotel-Nairobi-Westlands-photo-4.png' },
      { id: 5, photo: 'Novotel-Nairobi-Westlands-photo-5.png' },
    ],
    rooms: [
      {
        id: 1,
        category: { id: 1, name: 'Стандартный номер' },
        food: {
          reservation_available_without_meals: true,
          type_of_meals: 'Завтрак включен',
          cost_day: 1000,
        },
        smoking: false,
        pet: false,
        area: 25,
        amenities: [
          { id: 1, name: 'Wi-Fi' },
          { id: 2, name: 'Телевизор' },
        ],
        capacity: 2,
        single_bed: null,
        double_bed: 1,
        nightly_price: 5000,
        photos: [
          { id: 1, photo: 'room1.png' },
          { id: 2, photo: 'room2.png' },
        ],
      },
      {
        id: 2,
        category: { id: 2, name: 'Люкс' },
        food: {
          reservation_available_without_meals: true,
          type_of_meals: 'Завтрак включен',
          cost_day: 1000,
        },
        smoking: false,
        pet: false,
        area: 50,
        amenities: [
          { id: 1, name: 'Wi-Fi' },
          { id: 2, name: 'Мини-бар' },
          { id: 3, name: 'Джакузи' },
        ],
        capacity: 4,
        single_bed: null,
        double_bed: 2,
        nightly_price: 10000,
        photos: [
          { id: 3, photo: 'room3.png' },
          { id: 4, photo: 'room4.png' },
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
        checked: true,
      },
      {
        name: 'Детская кроватка',
        description:
          'Детская кроватка при необходимости оплачивается отдельно - 500р/ночь. Детский стульчик предоставляется по запросу.',
        checked: true,
      },
      {
        name: 'Курение на территории',
        description:
          'Курение на территории отля разрешается только в строго отведённых для этого местах',
        checked: true,
      },
      {
        name: 'Отмена бронирования',
        description: 'Отменить бронирование можно за 48 часов до заселения.',
        checked: false,
      },
    ],
  },
];
