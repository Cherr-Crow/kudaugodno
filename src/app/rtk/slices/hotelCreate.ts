export type hotels_create = {
  name: string;
  star_category: number; //1 | 2 | 3 | 4 | 5;
  place: string; //'Отель' | 'Хостел' | 'Вилла' | 'Апартаменты' | 'Гостевой дом' | 'Гостиница'; // я б переименовал в type_of_accommodation
  country: string;
  city: string;
  address: string;
  distance_to_sea: number; // как и когда задаются? нет в макете
  distance_to_airport: number; // как и когда задаются? нет в макете
  description: string;
  check_in_time: string;
  check_out_time: string;

  // не хватает:
  type_of_rest: string; //'Пляжный' | 'Городской';
  amenities: string[]; //'Бассейн'|'Собственный пляж'|'Семейные номера'|'Детский клуб'|'Аквапарк'|'Теннисный корт'|'Ресторан a la carte'|'Бесплатный интернет' + (надо сначала получить возможные, отдать выбранные, при необходимости добавить)
  photos_hotel: string[];
  meal: hotels_create_meal[];
  rooms: hotels_create_rooms[];
  dates: hotels_create_date[] | null;
  // отзывы
};

export type hotels_create_meal = {
  reservation_available_without_meals: boolean; // Доступно бронирование без питания
  type_of_meals: string; // завтрак|обед|ужин + возможность добавить
  cost_day: number; // string? что б была возможность передать с валютой
};

export type hotels_create_rooms = {
  room_category: string;
  type_meal: string[];
  number_of_residents: number;
  area: number;
  facilities: string[]; //(получить? + возможность добавить)
  photos_room: string[];
};

export type hotels_create_date = {
  date: string;
  available_for_booking: boolean;
  promotions: boolean;
  available_rooms: { category: string; cost_per_day: number }[];
  discount_amount: number;
};
