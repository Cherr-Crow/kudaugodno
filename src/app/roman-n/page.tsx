'use client';
import React, { Suspense } from 'react';

import { nanoid } from 'nanoid';

import { Accordeon } from '@/shared/ui/accordeon';
import { AddedButton } from '@/shared/ui/added-button';
import { ApplicationCard } from '@/shared/ui/application-card';
import { ApplicationInfo } from '@/shared/ui/application-info';
import { Badge } from '@/shared/ui/badge';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { Checkbox } from '@/shared/ui/checkbox';
import { ModalTours } from '@/shared/ui/modal-tours';
import { NamedInput } from '@/shared/ui/named-input';
import { OtherTours } from '@/shared/ui/other-tours';
import { PopupWindow } from '@/shared/ui/popup-window';
import { RadioButton } from '@/shared/ui/radio-button';
import { ReviewsCard } from '@/shared/ui/reviews-card';
import { ReviewsTours } from '@/shared/ui/reviews-tours';
import { RoomCards } from '@/shared/ui/room-cards';
import { RuleAdd } from '@/shared/ui/rule-add';
import { SearchBlock } from '@/shared/ui/search-block';
import { InputDateForSearchBlock } from '@/shared/ui/search-block/input-date-for-search-block';
import { InputForSearchBlock } from '@/shared/ui/search-block/input-for-search-block';
import { Select } from '@/shared/ui/select';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { NameSvg } from '@/shared/ui/svg-sprite/SvgSprite.types';
import { Switcher } from '@/shared/ui/switcher';
import { TabBar } from '@/shared/ui/tab-bar';
import { Typography } from '@/shared/ui/typography';
import { IApplication } from '@/types/application.type';
import { IHotel } from '@/types/hotel';
import { ITour } from '@/types/tour-type';

const svgNameList = [
  'room_guest_child',
  'icutlery_items',
  'square_room',
  'room-guests',
  'bed',
  'map',
  'entertainment',
  'bus',
  'icon_document',
  'icon_video',
  'trash-light',
  'plant',
  'tennis-racket',
  'sort',
  'airplane',
  'arrow-pointer',
  'bell',
  'calendar',
  'firecracker',
  'waves',
  'warning',
  'user',
  'telegram',
  'star',
  'star-full',
  'sofa',
  'phone',
  'ru',
  'gb',
  'like-bold',
  'location',
  'magic-wand',
  'mail',
  'arrow',
  'cross',
  'fire',
  'image',
  'lightning',
  'list',
  'logo',
  'heart-outline',
  'search',
  'amenity-animals-allowed',
  'amenity-cart-restaurant',
  'amenity-check-in',
  'amenity-family-room',
  'amenity-pool',
  'amenity-spa',
  'amenity-wifi',
  'our_advantage_1',
  'our_advantage_2',
  'our_advantage_3',
  'check-mark',
  'paw',
  'face',
  'ruler',
  'parentsChld',
  'filter',
  'back-arrow',
  'google',
  'vkontakte',
  'yandex',
  'arrow-check',
  'airplane-tour',
  'eat',
  'admin-panel-tourist-background',
  'add-image',
  'frog-on-chair',
  'frog-on-suitcase',
  'frog-with-purse',
  'more',
  'eye',
  'admin-response',
  'comments',
  'ellipsisVertical',
  'greenCircle',
  'for-business',
];

const testHotel: IHotel = {
  id: 1,
  name: 'Отель под номером в Марсель',
  star_category: 4,
  place: 'Хостел',
  country: 'Франция',
  city: 'Марсель',
  address: 'Ул. Пушкина, д. 1',
  distance_to_the_station: 5850,
  distance_to_the_sea: 22016,
  distance_to_the_center: 5514,
  distance_to_the_metro: 36101,
  distance_to_the_airport: 2013,
  description: 'Так себе описание отеля под номером 1',
  check_in_time: '16:00:00',
  check_out_time: '10:00:00',
  amenities_common: [],
  amenities_in_the_room: [],
  amenities_sports_and_recreation: [],
  amenities_for_children: [],
  type_of_meals_ultra_all_inclusive: 4340,
  type_of_meals_all_inclusive: 4687,
  type_of_meals_full_board: 2221,
  type_of_meals_half_board: 2214,
  type_of_meals_only_breakfast: 884,
  user_rating: 4.8,
  type_of_rest: 'С детьми',
  rules: [
    {
      name: 'Бухать',
      description: 'Можно если за Вами следит жена',
    },
    {
      name: 'С животными',
      description: 'Можно если за ними следить',
    },
  ],
  is_active: true,
  room_categories: ['Полулюкс', 'Семейный'],
  width: '-66.788006',
  longitude: '-24.565295',
  photo: [
    {
      id: 1,
      photo: 'http://localhost:8000/media/hotels/hotels/7.jpg',
      hotel: 1,
    },
    {
      id: 2,
      photo: 'http://localhost:8000/media/hotels/hotels/13.jpg',
      hotel: 1,
    },
    {
      id: 3,
      photo: 'http://localhost:8000/media/hotels/hotels/5.jpg',
      hotel: 1,
    },
    {
      id: 4,
      photo: 'http://localhost:8000/media/hotels/hotels/10.jpg',
      hotel: 1,
    },
  ],
  rooms: [
    {
      id: 5,
      category: 'Делюкс',
      price: 39182,
      type_of_meals: "['Только завтраки', 'Полупансион', 'Ультра всё включено']",
      number_of_adults: 2,
      number_of_children: 4,
      single_bed: 1,
      double_bed: 3,
      area: 58,
      quantity_rooms: 4,
      discount: [],
      unavailable: [],
      amenities_common: ['WiFi', 'Минибар', 'ТВ'],
      amenities_coffee: [],
      amenities_bathroom: ['Фен', 'Душевые принадлежности'],
      amenities_view: ['Море'],
      photo: [
        {
          id: 25,
          photo: 'http://localhost:8000/media/hotels/hotels/rooms/14_Jsh67zc.jpg',
          room: 5,
        },
        {
          id: 26,
          photo: 'http://localhost:8000/media/hotels/hotels/rooms/7_ug71MrT.jpg',
          room: 5,
        },
        {
          id: 27,
          photo: 'http://localhost:8000/media/hotels/hotels/rooms/11_sWCTnyk.jpg',
          room: 5,
        },
        {
          id: 28,
          photo: 'http://localhost:8000/media/hotels/hotels/rooms/8_07pUVou.jpg',
          room: 5,
        },
        {
          id: 29,
          photo: 'http://localhost:8000/media/hotels/hotels/rooms/15.jpg',
          room: 5,
        },
        {
          id: 30,
          photo: 'http://localhost:8000/media/hotels/hotels/rooms/7_P0KmWnb.jpg',
          room: 5,
        },
      ],
    },
    {
      id: 1,
      category: 'Полулюкс',
      price: 32654,
      type_of_meals: "['Только завтраки', 'Полупансион', 'Ультра всё включено']",
      number_of_adults: 3,
      number_of_children: 1,
      single_bed: 3,
      double_bed: 3,
      area: 36,
      quantity_rooms: 3,
      discount: [],
      unavailable: [],
      amenities_common: ['ТВ', 'Минибар', 'Кондиционер'],
      amenities_coffee: ['Кофе машина в номере'],
      amenities_bathroom: ['Фен', 'Душевые принадлежности'],
      amenities_view: ['Сад', 'Горы', 'Море'],
      photo: [
        {
          id: 1,
          photo: 'http://localhost:8000/media/hotels/hotels/rooms/8.jpg',
          room: 1,
        },
        {
          id: 2,
          photo: 'http://localhost:8000/media/hotels/hotels/rooms/7.jpg',
          room: 1,
        },
        {
          id: 3,
          photo: 'http://localhost:8000/media/hotels/hotels/rooms/4.jpg',
          room: 1,
        },
        {
          id: 4,
          photo: 'http://localhost:8000/media/hotels/hotels/rooms/2.jpg',
          room: 1,
        },
        {
          id: 5,
          photo: 'http://localhost:8000/media/hotels/hotels/rooms/7_bAd6fPe.jpg',
          room: 1,
        },
        {
          id: 6,
          photo: 'http://localhost:8000/media/hotels/hotels/rooms/2_KiECDxH.jpg',
          room: 1,
        },
      ],
    },
    {
      id: 4,
      category: 'Полулюкс',
      price: 11384,
      type_of_meals: "['Только завтраки', 'Полупансион', 'Ультра всё включено']",
      number_of_adults: 4,
      number_of_children: 1,
      single_bed: 1,
      double_bed: 2,
      area: 38,
      quantity_rooms: 10,
      discount: [],
      unavailable: [],
      amenities_common: ['Минибар', 'WiFi', 'ТВ', 'Кондиционер'],
      amenities_coffee: [],
      amenities_bathroom: ['Фен', 'Душевые принадлежности'],
      amenities_view: ['Сад', 'Море'],
      photo: [
        {
          id: 19,
          photo: 'http://localhost:8000/media/hotels/hotels/rooms/12_9FczE3V.jpg',
          room: 4,
        },
        {
          id: 20,
          photo: 'http://localhost:8000/media/hotels/hotels/rooms/6.jpg',
          room: 4,
        },
        {
          id: 21,
          photo: 'http://localhost:8000/media/hotels/hotels/rooms/13.jpg',
          room: 4,
        },
        {
          id: 22,
          photo: 'http://localhost:8000/media/hotels/hotels/rooms/9_qRa3OY6.jpg',
          room: 4,
        },
        {
          id: 23,
          photo: 'http://localhost:8000/media/hotels/hotels/rooms/9_ZydRScL.jpg',
          room: 4,
        },
        {
          id: 24,
          photo: 'http://localhost:8000/media/hotels/hotels/rooms/8_2aAyL5J.jpg',
          room: 4,
        },
      ],
    },
    {
      id: 2,
      category: 'Семейный',
      price: 1182,
      type_of_meals: "['Только завтраки', 'Полупансион', 'Ультра всё включено']",
      number_of_adults: 4,
      number_of_children: 2,
      single_bed: 1,
      double_bed: 2,
      area: 78,
      quantity_rooms: 9,
      discount: [],
      unavailable: [],
      amenities_common: ['Кондиционер', 'ТВ', 'WiFi'],
      amenities_coffee: [],
      amenities_bathroom: ['Фен', 'Душевые принадлежности'],
      amenities_view: ['Сад', 'Горы'],
      photo: [
        {
          id: 7,
          photo: 'http://localhost:8000/media/hotels/hotels/rooms/14.jpg',
          room: 2,
        },
        {
          id: 8,
          photo: 'http://localhost:8000/media/hotels/hotels/rooms/8_qy3Jin7.jpg',
          room: 2,
        },
        {
          id: 9,
          photo: 'http://localhost:8000/media/hotels/hotels/rooms/12.jpg',
          room: 2,
        },
        {
          id: 10,
          photo: 'http://localhost:8000/media/hotels/hotels/rooms/7_yVjyMTJ.jpg',
          room: 2,
        },
        {
          id: 11,
          photo: 'http://localhost:8000/media/hotels/hotels/rooms/3.jpg',
          room: 2,
        },
        {
          id: 12,
          photo: 'http://localhost:8000/media/hotels/hotels/rooms/14_vaONOGc.jpg',
          room: 2,
        },
      ],
    },
    {
      id: 3,
      category: 'Семейный',
      price: 6732,
      type_of_meals: "['Только завтраки', 'Полупансион', 'Ультра всё включено']",
      number_of_adults: 1,
      number_of_children: 3,
      single_bed: 1,
      double_bed: 1,
      area: 47,
      quantity_rooms: 9,
      discount: [],
      unavailable: [],
      amenities_common: ['Минибар', 'ТВ', 'Кондиционер'],
      amenities_coffee: [],
      amenities_bathroom: ['Фен'],
      amenities_view: ['Горы', 'Море'],
      photo: [
        {
          id: 13,
          photo: 'http://localhost:8000/media/hotels/hotels/rooms/4_pxuNx7J.jpg',
          room: 3,
        },
        {
          id: 14,
          photo: 'http://localhost:8000/media/hotels/hotels/rooms/14_phpSApP.jpg',
          room: 3,
        },
        {
          id: 15,
          photo: 'http://localhost:8000/media/hotels/hotels/rooms/9.jpg',
          room: 3,
        },
        {
          id: 16,
          photo: 'http://localhost:8000/media/hotels/hotels/rooms/1.jpg',
          room: 3,
        },
        {
          id: 17,
          photo: 'http://localhost:8000/media/hotels/hotels/rooms/7_9WDe5YV.jpg',
          room: 3,
        },
        {
          id: 18,
          photo: 'http://localhost:8000/media/hotels/hotels/rooms/11.jpg',
          room: 3,
        },
      ],
    },
  ],
};

const testApplication: IApplication = {
  pk: 1,
  tour: {
    id: 22,
    hotel_id: 1,
    start_date: '2025-05-16',
    end_date: '2025-05-20',
    departure_country: 'Россия',
    departure_city: 'Москва',
    arrival_country: 'Россия',
    arrival_city: 'Москва',
    tour_operator: 'ТИМА бэков',
    room: 'Семейный',
    transfer: true,
    price: 199843.96,
    created_at: '2025-05-05T17:22:28.726663+03:00',
    updated_at: '2025-05-05T17:22:28.726679+03:00',
    is_active: false,
    flight_to: 'dddd',
    flight_from: 'sss',
    hotel: testHotel,
  },
  email: 'mered1an@live.com',
  phone_number: '+79958873535',
  status: 'Ожидает подтверждения',
  quantity_guests: [
    {
      pk: 3,
      firstname: 'Татьяна',
      lastname: 'Гаганова',
      surname: 'Валентиновна',
      date_born: '2025-04-24',
      citizenship: 'РФ',
      russian_passport_no: '1234 123466',
      international_passport_no: '12 3652147',
      validity_international_passport: '2025-04-24',
      user_owner: {
        id: 1,
        first_name: 'Admin',
        last_name: 'Admin',
        email: 'koikov.ivan@guild-of-developers.ru',
        phone_number: '',
        avatar: null,
        birth_date: null,
        role: 'USER',
      },
    },
    {
      pk: 2,
      firstname: 'Тимофей',
      lastname: 'Дегтярёв',
      surname: 'Алексеевич',
      date_born: '2025-04-24',
      citizenship: 'РФ',
      russian_passport_no: '1234 123455',
      international_passport_no: '12 1236547',
      validity_international_passport: '2025-04-24',
      user_owner: {
        id: 1,
        first_name: 'Admin',
        last_name: 'Admin',
        email: 'koikov.ivan@guild-of-developers.ru',
        phone_number: '',
        avatar: null,
        birth_date: null,
        role: 'USER',
      },
    },
    {
      pk: 4,
      firstname: 'Марина',
      lastname: 'Морозова',
      surname: 'Алексеевна',
      date_born: '2025-04-24',
      citizenship: 'РФ',
      russian_passport_no: '1234 145236',
      international_passport_no: '12 9632584',
      validity_international_passport: '2025-04-24',
      user_owner: {
        id: 1,
        first_name: 'Admin',
        last_name: 'Admin',
        email: 'koikov.ivan@guild-of-developers.ru',
        phone_number: '',
        avatar: null,
        birth_date: null,
        role: 'USER',
      },
    },
    {
      pk: 1,
      firstname: 'Никита',
      lastname: 'Шидогубов',
      surname: 'Александрови',
      date_born: '2025-04-24',
      citizenship: 'РФ',
      russian_passport_no: '1234 123456',
      international_passport_no: '12 3654789',
      validity_international_passport: '2025-04-24',
      user_owner: {
        id: 1,
        first_name: 'Admin',
        last_name: 'Admin',
        email: 'koikov.ivan@guild-of-developers.ru',
        phone_number: '',
        avatar: null,
        birth_date: null,
        role: 'USER',
      },
    },
  ],
  visa: true,
  med_insurance: true,
  cancellation_insurance: true,
  wishes: 'Тусить и тестить',
};

const testTour: ITour = {
  hotel_id: 1,
  id: 1,
  start_date: '2025-05-16',
  end_date: '2025-05-20',
  flight_to: 'ddd',
  flight_from: 'sdsd',
  departure_country: 'Россия',
  departure_city: 'Москва',
  arrival_country: 'Россия',
  arrival_city: 'Москва',
  tour_operator: 'ТИМА бэков',
  hotel: testHotel,
  room: 'Семейный',
  transfer: true,
  price: 199843.96,
  created_at: '2025-05-05T17:22:28.726663+03:00',
  updated_at: '2025-05-05T17:22:28.726679+03:00',
  is_active: false,
};

const testList = [
  'option 1',
  'option 2',
  'option 3',
  'option 4',
  'option 5',
  'option 6',
  'option 7',
];

const tabsTestList = ['Отель', 'Номера', 'Даты', 'Всё что угодно'];
const tabsTestList2 = ['разные названия', 'адаптивный'];

export default function RomanN() {
  return (
    <Suspense>
      <section className='pt-3'>
        <div className='container'>
          <div className='flex flex-col gap-3'>
            <div className='max-w-fit rounded-xl border border-dashed p-4'>
              <h2 className='mb-3 w-fit bg-blue-400'>Typography</h2>
              <div className='flex flex-col items-center gap-3'>
                <Typography variant='h1'>h1 (60px/500)</Typography>
                <Typography variant='subtitle1'>subtitle1 (60px/400)</Typography>
                <Typography variant='h2'>h2 (48px/500)</Typography>
                <Typography variant='subtitle2'>subtitle2 (48px/400)</Typography>
                <Typography variant='h3'>h3 (40px/500)</Typography>
                <Typography variant='subtitle3'>subtitle3 (40px/400)</Typography>
                <Typography variant='h4'>h4 (32px/500)</Typography>
                <Typography variant='subtitle4'>subtitle4 (24px/400)</Typography>
                <Typography variant='h5'>h5 (24px/500)</Typography>
                <Typography variant='l'>l (20px/400)</Typography>
                <Typography variant='l-bold'>l-bold (20px/500)</Typography>
                <Typography variant='m'>m (16px/400)</Typography>
                <Typography variant='m-bold'>m-bold (16px/500)</Typography>
                <Typography variant='s'>s (13px/400)</Typography>
                <Typography variant='s-bold'>s-bold (13px/500)</Typography>
                <Typography variant='xs'>xs (11px/400)</Typography>
                <Typography>default (16px/400) = variant=m</Typography>
              </div>
            </div>

            <div className=''>
              <h2 className='mb-3 w-fit bg-blue-400'>SvgSprite</h2>
              <div className='flex flex-col items-center justify-center gap-3'>
                <div className='flex flex-wrap gap-3'>
                  {svgNameList.map((svg) => (
                    <div
                      className='flex flex-col items-center justify-center gap-2 rounded-lg border bg-grey-200 p-2'
                      key={nanoid()}
                    >
                      <p className=''>{svg}</p>
                      <SvgSprite name={svg as NameSvg} width={30} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='rounded-xl border border-dashed p-4'>
              <h2 className='mb-3 w-fit bg-blue-400'>ButtonCustom</h2>
              <div className='flex flex-wrap items-center gap-3'>
                <ButtonCustom variant='primary' size='l'>
                  <Typography variant='s-bold'>
                    Сюда можно вставлять всё что угодно
                  </Typography>
                </ButtonCustom>
                <ButtonCustom variant='primary' size='l' disabled>
                  <div className='flex items-center gap-3'>
                    <SvgSprite name='mail' width={30} />
                    <Typography variant='h4'>Отправить</Typography>
                  </div>
                </ButtonCustom>
                <ButtonCustom variant='primary' size='m'>
                  <Typography>текст</Typography>
                </ButtonCustom>
                <ButtonCustom variant='primary' size='s'>
                  <Typography>текст</Typography>
                </ButtonCustom>
                <ButtonCustom variant='secondary' size='l'>
                  <Typography variant='s-bold'>
                    Сюда можно вставлять всё что угодно
                  </Typography>
                </ButtonCustom>
                <ButtonCustom variant='tetriary' size='m'>
                  <div className='flex items-center gap-3'>
                    <SvgSprite name='tennis-racket' width={30} />
                    <Typography variant='m-bold'>Отправить</Typography>
                  </div>
                </ButtonCustom>
                <ButtonCustom variant='danger' size='m'>
                  <Typography>текст</Typography>
                </ButtonCustom>
                <ButtonCustom variant='wzhuh' size='s'>
                  <div className='flex items-center gap-2'>
                    <Typography className='text-white'>Вжух</Typography>
                    <SvgSprite name='magic-wand' width={20} color='#fff' />
                  </div>
                </ButtonCustom>
              </div>
            </div>

            <div className='flex gap-2'>
              <div className='max-w-fit rounded-xl border border-dashed p-4'>
                <h2 className='mb-3 w-fit bg-blue-400'>Checkbox</h2>
                <label>Checkbox</label>
                <Checkbox label='Checkbox text' />
                <label>Checkbox disabled</label>
                <Checkbox label='Checkbox text' isDisabled={true} />
                <label>Switchers active by default</label>
                <Checkbox label='Checkbox text' isChecked={true} />
              </div>

              <div className='max-w-fit rounded-xl border border-dashed p-4'>
                <h2 className='mb-3 w-fit bg-blue-400'>RadioButton</h2>
                <label>RadioButton</label>
                <RadioButton label='RadioButton text' />
                <label>RadioButton disabled</label>
                <RadioButton label='RadioButton text' isDisabled={true} />
                <label>Switchers active by default</label>
                <RadioButton label='RadioButton text' isSelected={true} />
              </div>

              <div className='max-w-fit rounded-xl border border-dashed p-4'>
                <h2 className='mb-3 w-fit bg-blue-400'>Switcher</h2>
                <label>Switcher</label>
                <Switcher />
                <label>Switcher disabled</label>
                <Switcher isDisabled={true} />
                <label>Switchers active by default</label>
                <Switcher isActive={true} />
              </div>
            </div>

            <div className='max-w-fit rounded-xl border border-dashed p-4'>
              <h2 className='mb-3 w-fit bg-blue-400'>ModalTours</h2>
              <ModalTours type='comfort' />
            </div>

            <div className='flex gap-2'>
              <div className='max-w-fit rounded-xl border border-dashed p-4'>
                <h2 className='mb-3 w-fit bg-blue-400'>ApplicationInfo</h2>
                <ApplicationInfo title='2 гостей' subtitle='Даты поездки' />
              </div>

              <div className='max-w-fit rounded-xl border border-dashed p-4'>
                <h2 className='mb-3 w-fit bg-blue-400'>Badge</h2>
                <Badge name='Макао' price='от 23 342 ₽' />
                <Badge name='Тайланд' price='от 347 345 ₽' size='small' />
              </div>
            </div>

            <div className='max-w-fit rounded-xl border border-dashed p-4'>
              <h2 className='mb-3 w-fit bg-blue-400'>NamedInput</h2>
              <NamedInput
                name='Цена для ребенка'
                title='Цена для ребенка'
                placeholder='6 500 ₽'
              />
              <NamedInput
                name='Номер рейса'
                title='Номер рейса'
                placeholder='SU-12345'
                disabled
              />
            </div>

            <div className='max-w-fit rounded-xl border border-dashed p-4'>
              <h2 className='mb-3 w-fit bg-blue-400'>OtherTours</h2>
              <OtherTours />
            </div>

            <div className='max-w-fit rounded-xl border border-dashed p-4'>
              <h2 className='mb-3 w-fit bg-blue-400'>ApplicationCard</h2>
              <ApplicationCard
                tour={testTour}
                application={testApplication}
                status='fulfilled'
              />
            </div>

            <div className='max-w-fit rounded-xl border border-dashed p-4'>
              <h2 className='mb-3 w-fit bg-blue-400'>ReviewsCard</h2>
              <ReviewsCard />
            </div>

            <div className='max-w-fit rounded-xl border border-dashed p-4'>
              <h2 className='mb-3 w-fit bg-blue-400'>ReviewsTours</h2>
              <ReviewsTours />
            </div>

            <div className='max-w-fit rounded-xl border border-dashed p-4'>
              <h2 className='mb-3 w-fit bg-blue-400'>RoomCards</h2>
              <RoomCards
                name='Standard Room'
                start_date='5 окт, сб'
                end_date='12 окт, сб'
                tour_operator='Fun&Sun'
                price='240894'
                services={[
                  { type: 'eat', text: 'Завтраки' },
                  { type: 'airplane', text: 'С перелетом' },
                ]}
              />
            </div>

            <div className='flex gap-2'>
              <div className='max-w-fit rounded-xl border border-dashed p-4'>
                <h2 className='mb-3 w-fit bg-blue-400'>RuleAdd</h2>
                <RuleAdd
                  rule={{ name: 'Размещение животных', description: '' }}
                  getValue={() => {}}
                />
              </div>

              <div className='max-w-fit rounded-xl border border-dashed p-4'>
                <h2 className='mb-3 w-fit bg-blue-400'>AddedButton</h2>
                <AddedButton text='Добавить правило' />
              </div>
            </div>

            <div className='flex gap-2'>
              <div className='max-w-fit rounded-xl border border-dashed p-4'>
                <h2 className='mb-3 w-fit bg-blue-400'>InputDateForSearchBlock</h2>
                <InputDateForSearchBlock
                  placeholder='Дата вылета'
                  getValue={() => {}}
                />
              </div>
              <div className='max-w-fit rounded-xl border border-dashed p-4'>
                <h2 className='mb-3 w-fit bg-blue-400'>InputForSearchBlock</h2>
                <InputForSearchBlock
                  placeholder='Город вылета'
                  getValue={() => {}}
                />
              </div>
            </div>

            <div className='max-w-fit rounded-xl border border-dashed p-4'>
              <h2 className='mb-3 w-fit bg-blue-400'>SearchBlock</h2>
              <SearchBlock />
            </div>

            <div className='flex gap-2'>
              <div className='max-w-fit rounded-xl border border-dashed p-4'>
                <h2 className='mb-3 w-fit bg-blue-400'>Select</h2>
                <div className='flex'>
                  <Select options={testList} />
                  <Select options={testList} color='blue' />
                  <Select options={tabsTestList} color='green' />
                </div>
              </div>

              <div className='relative'>
                <h2 className='w-fit bg-blue-400'>элемент PopupWindow</h2>
                <PopupWindow className='top-15 left-3 px-4 py-5'>
                  <ul className='w-fit'>
                    {testList.map((option) => (
                      <li key={nanoid()} className=''>
                        {option}
                      </li>
                    ))}
                  </ul>
                </PopupWindow>
                <PopupWindow className='left-40 top-24 px-2 py-3'>
                  <h2 className=''>какой то подзаголовок</h2>
                  <p className='text-sm'>текст для подзаголовка</p>
                </PopupWindow>
              </div>
            </div>

            <div className='max-w-fit rounded-xl border border-dashed p-4'>
              <h2 className='mb-3 w-fit bg-blue-400'>TabBar</h2>
              <TabBar tabs={tabsTestList} svgTab={[]} getActiveTab={() => {}} />
              <TabBar
                tabs={tabsTestList2}
                className='mt-4'
                svgTab={[]}
                getActiveTab={() => {}}
              />
            </div>

            <div className='max-w-fit rounded-xl border border-dashed p-4'>
              <h2 className='mb-3 w-fit bg-blue-400'>Accordeon</h2>
              <Accordeon title='Информация о работе с личным кабинетом'>
                <p>Lorem ipsum dolor sit amet.</p>
              </Accordeon>
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
}
