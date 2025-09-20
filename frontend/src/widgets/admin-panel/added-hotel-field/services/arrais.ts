import { NameSvg } from '@/shared/ui/svg-sprite/SvgSprite.types';

export type IAmenity = {
  id: string;
  label: string;
  icon: NameSvg;
};

export const typeOfHoliday = ['Не выбранно', 'Пляжный', 'Городской'];
export const accommodationType = [
  'Не выбранно',
  'Отель',
  'Хостел',
  'Вилла',
  'Апартаменты',
  'Гостевой дом',
  'Гостиница',
];
export const amenities_common: IAmenity[] = [
  {
    id: 'beachfront',
    label: 'Первая линия',
    icon: 'waves',
  },
  {
    id: 'pool',
    label: 'Бассейн',
    icon: 'amenity-pool',
  },
  {
    id: 'spa',
    label: 'СПА',
    icon: 'amenity-spa',
  },
  {
    id: 'wifi',
    label: 'Бесплатный Wi-Fi',
    icon: 'amenity-wifi',
  },
  {
    id: 'gym',
    label: 'Спортзал',
    icon: 'gym',
  },
  {
    id: 'family_rooms',
    label: 'Семейные номера',
    icon: 'amenity-family-room',
  },
  {
    id: 'a_la_carte',
    label: 'Ресторан a la carte',
    icon: 'amenity-cart-restaurant',
  },
  {
    id: 'kids_activities',
    label: 'Детские активности',
    icon: 'entertainment',
  },
  {
    id: 'pet_friendly',
    label: 'Можно с животными',
    icon: 'paw',
  },
  {
    id: 'parking',
    label: 'Бесплатная парковка',
    icon: 'parking',
  },
  {
    id: 'greenery',
    label: 'Много зелени',
    icon: 'plant',
  },
  {
    id: 'accessible',
    label: 'Доступ с коляской',
    icon: 'wheelchair',
  },
  {
    id: 'tennis',
    label: 'Теннисный корт',
    icon: 'tennis-racket',
  },
  {
    id: 'transfer',
    label: 'Трансфер',
    icon: 'bus',
  },
];
export const amenities_in_the_room = [
  'Бесплатный интернет',
  'Вид на море',
  'Кондиционеры',
];
export const amenities_sports_and_recreation = [
  'Бассейн',
  'Теннисный корт',
  'Спортзал',
  'Спа-центр',
];
export const amenities_for_children = [
  'Детский клуб',
  'Аквапарк',
  'Вечерняя анимация',
];
