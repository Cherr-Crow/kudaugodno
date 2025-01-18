// export type hotelsCreate = {
//   id: number;
//   name: string;
//   star_category: number; //1 | 2 | 3 | 4 | 5;
//   place: string; //'Отель' | 'Хостел' | 'Вилла' | 'Апартаменты' | 'Гостевой дом' | 'Гостиница'; // я б переименовал в type_of_accommodation
//   country: string;
//   city: string;
//   address: string;
//   distances: { location: string; distance: number }[];
//   description: string;
//   check_in_time: string;
//   check_out_time: string;
//
//   // не хватает:
//   type_of_rest: string; //'Пляжный' | 'Городской';
//   amenities: string[]; //'Бассейн'|'Собственный пляж'|'Семейные номера'|'Детский клуб'|'Аквапарк'|'Теннисный корт'|'Ресторан a la carte'|'Бесплатный интернет' + (надо сначала получить возможные, отдать выбранные, при необходимости добавить)
//   photos_hotel: string[];
//   meal: hotelsCreateMeal[];
//   rooms: hotelsCreateRooms[];
//   dates: hotelsCreateDate[] | null;
//   // отзывы
// };
//
// export type hotelsCreateMeal = {
//   reservation_available_without_meals: boolean;
//   type_of_meals: string;
//   cost_day: number;
// };
//
// export type hotelsCreateRooms = {
//   room_category: string;
//   type_meal: string[];
//   number_of_residents: number;
//   area: number;
//   facilities: string[]; //(получить? + возможность добавить)
//   photos_room: string[];
// };
//
// export type hotelsCreateDate = {
//   date: string;
//   available_for_booking: boolean;
//   promotions: boolean;
//   available_rooms: { category: string; cost_per_day: number }[];
//   discount_amount: number;
// };
