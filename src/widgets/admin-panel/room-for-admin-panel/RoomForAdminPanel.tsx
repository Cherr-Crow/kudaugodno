'use client';

import React, { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import {
  useChangeRoomHotelMutation,
  useDelRoomHotelMutation,
  useGetOneHotelQuery,
} from '@/servicesApi/hotelsApi';
import { Accordeon } from '@/shared/ui/accordeon';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { NamedInput } from '@/shared/ui/named-input';
import { Select } from '@/shared/ui/select';
import { Typography } from '@/shared/ui/typography';
import { CheckBoxBlock } from '@/widgets/admin-panel/check-box-block';
// import { DiscountBlock } from '@/widgets/admin-panel/discount-block';
import { PhotosRoom } from '@/widgets/admin-panel/photos-room';

import { IRoomForAdminPanel } from './RoomForAdminPanel.types';
// import { UnavailableBlock } from '@/widgets/admin-panel/unavailable-block';

export function RoomForAdminPanel({ room }: IRoomForAdminPanel) {
  const hotelId = useSearchParams().get('id');
  const { data: hotel } = useGetOneHotelQuery(+hotelId!);
  const [delRoom] = useDelRoomHotelMutation();
  const [changeRoom] = useChangeRoomHotelMutation();

  const [price, setPrice] = useState<number>(room.dates[0].price);
  const [typeOfMeals, setTypeOfMeals] = useState<string>('Без питания');
  const [numberOfAdults, setNumberOfAdults] = useState<number>(
    room.number_of_adults,
  );
  const [numberOfChildren, setNumberOfChildren] = useState<number>(
    room.number_of_children,
  );
  const [singleBed, setSingleBed] = useState<number>(room.single_bed ?? 0);
  const [doubleBed, setDoubleBed] = useState<number>(room.double_bed ?? 0);
  const [area, setArea] = useState<number>(room.area);
  const [quantityRooms, setQuantityRooms] = useState<number>(room.quantity_rooms);
  // const [discount, setDiscount] = useState<
  //   {
  //     name: string;
  //     size: number;
  //     start_date: string;
  //     end_date: string;
  //   }[]
  // >(room.discount);
  // const [unavailable, setUnavailable] = useState<
  //   {
  //     reason: string;
  //     start_date: string;
  //     end_date: string;
  //   }[]
  // >(room.unavailable);
  const [amenitiesCommon, setAmenitiesCommon] = useState<string[]>(
    room.amenities_common,
  );
  const [amenitiesCoffee, setAmenitiesCoffee] = useState<string[]>(
    room.amenities_coffee,
  );
  const [amenitiesBathroom, setAmenitiesBathroom] = useState<string[]>(
    room.amenities_bathroom,
  );
  const [amenitiesView, setAmenitiesView] = useState<string[]>(room.amenities_view);
  // const [praceMeal, setPraceMeal] = useState<number>(0);
  // const [praceDiscount, setPraceDiscount] = useState<number>(0);

  const handlePriceChange = (value: number) => {
    setPrice(value);
  };

  const handleTypeOfMealsChange = (value: string) => {
    setTypeOfMeals(value);
  };

  const handleNumberOfAdultsChange = (value: number) => {
    setNumberOfAdults(value);
  };

  const handleNumberOfChildrenChange = (value: number) => {
    setNumberOfChildren(value);
  };

  const handleSingleBedChange = (value: number) => {
    setSingleBed(value);
  };

  const handleDoubleBedChange = (value: number) => {
    setDoubleBed(+value);
  };

  const handleAreaChange = (value: number) => {
    setArea(+value);
  };

  const handleQuantityRoomsChange = (value: number) => {
    setQuantityRooms(value);
  };

  // const handleDiscountChange = (
  //   value: {
  //     name: string;
  //     size: number;
  //     start_date: string;
  //     end_date: string;
  //   }[],
  // ) => {
  //   setDiscount(value);
  //   setPraceDiscount(
  //     price + praceMeal - (price * (discount[0] ? discount[0].size : 0)) / 100,
  //   );
  // };

  // const handleUnavailableChange = (
  //   value: [
  //     {
  //       id?: number;
  //       reason: string;
  //       start_date: string;
  //       end_date: string;
  //     },
  //   ],
  // ) => {
  //   setUnavailable(value);
  // };

  const handleAmenitiesCommonChange = (value: string[]) => {
    setAmenitiesCommon(value);
  };

  const handleTAmenitiesCoffeeChange = (value: string[]) => {
    setAmenitiesCoffee(value);
  };

  const handleAmenitiesBathroomChange = (value: string[]) => {
    setAmenitiesBathroom(value);
  };

  const handleAmenitiesViewChange = (value: string[]) => {
    setAmenitiesView(value);
  };

  const handleDelRoom = async (id: number) => {
    if (!hotelId) return;
    await delRoom({ hotelId: +hotelId, roomId: id });
  };

  const handleChangeRoom = () => {
    if (!hotelId) return;

    const _room = {
      category: room.category,
      price,
      type_of_meals: [
        { id: 1, name: 'Завтрак', price: 500 },
        { id: 2, name: 'Полупансион', price: 1500 },
      ],
      number_of_adults: numberOfAdults,
      number_of_children: numberOfChildren,
      single_bed: singleBed,
      double_bed: doubleBed,
      area,
      quantity_rooms: quantityRooms,
      amenities_common: amenitiesCommon,
      amenities_coffee: amenitiesCoffee,
      amenities_bathroom: amenitiesBathroom,
      amenities_view: amenitiesView,
      rules: [{ name: 'Курение запрещено', option: true }],
      dates: [
        {
          id: 1,
          start_date: '2024-07-01',
          end_date: '2024-07-10',
          available_for_booking: true,
          stock: true,
          share_size: 0.2,
          price: 42000,
        },
      ],
      // discount,
      // unavailable,
    };

    changeRoom({ body: _room, hotel_id: +hotelId, room_id: room.id });
  };

  useEffect(() => {
    if (!hotel) return;
    // switch (typeOfMeals) {
    //   case 'Только завтрак':
    //     setPraceMeal((hotel.type_of_meals_only_breakfast ?? 0) + price);
    //     setPraceDiscount(
    //       price +
    //         (hotel.type_of_meals_only_breakfast ?? 0) -
    //         (price * (discount[0] ? discount[0].size : 0)) / 100,
    //     );
    //     break;
    //   case 'Полупансион':
    //     setPraceMeal((hotel.type_of_meals_half_board ?? 0) + price);
    //     setPraceDiscount(
    //       price +
    //         (hotel.type_of_meals_half_board ?? 0) -
    //         (price * (discount[0] ? discount[0].size : 0)) / 100,
    //     );
    //     break;
    //   case 'Полный пансион':
    //     setPraceMeal((hotel.type_of_meals_full_board ?? 0) + price);
    //     setPraceDiscount(
    //       price +
    //         (hotel.type_of_meals_full_board ?? 0) -
    //         (price * (discount[0] ? discount[0].size : 0)) / 100,
    //     );
    //     break;
    //   case 'Все включено':
    //     setPraceMeal(+(hotel.type_of_meals_all_inclusive ?? 0) + price);
    //     setPraceDiscount(
    //       price +
    //         (hotel.type_of_meals_all_inclusive ?? 0) -
    //         (price * (discount[0] ? discount[0].size : 0)) / 100,
    //     );
    //     break;
    //   case 'Ультра все включено':
    //     setPraceMeal((hotel.type_of_meals_ultra_all_inclusive ?? 0) + price);
    //     setPraceDiscount(
    //       price +
    //         (hotel.type_of_meals_ultra_all_inclusive ?? 0) -
    //         (price * (discount[0] ? discount[0].size : 0)) / 100,
    //     );
    //     break;
    //   default:
    //     setPraceMeal(+price);
    //     setPraceDiscount(
    //       price - (price * (discount[0] ? discount[0].size : 0)) / 100,
    //     );
    // }
  }, [typeOfMeals, price]);

  return (
    <div className=''>
      <div className='flex flex-col gap-4 p-5'>
        <div className='flex flex-col gap-5 rounded-2xl border border-grey-200 p-5 shadow-md shadow-grey-500'>
          <div className='flex items-center justify-between'>
            <Typography variant='h4'>{`ID № ${room.id}`}</Typography>
            <ButtonCustom
              variant='danger'
              size='s'
              onClick={() => handleDelRoom(room.id)}
            >
              <Typography className='text-red-primary-800' variant='m-bold'>
                Удалить номер
              </Typography>
            </ButtonCustom>
          </div>
          <Accordeon title='Общие'>
            <div className='flex flex-col gap-5 p-5'>
              <div className='grid grid-cols-4 items-center gap-3'>
                <NamedInput
                  name='Цена'
                  title='Цена'
                  type='number'
                  startValue={room.dates[0].price}
                  getValue={(val) => handlePriceChange(val as number)}
                />
                <div>
                  <Typography variant='l-bold'>Тип питания</Typography>
                  <Select
                    startValue={'Без питания'}
                    options={[
                      'Без питания',
                      'Только завтрак',
                      'Полупансион',
                      'Полный пансион',
                      'Все включено',
                      'Ультра все включено',
                    ]}
                    color='blue'
                    size='small'
                    className='mt-3 w-full'
                    getValue={handleTypeOfMealsChange}
                  />
                </div>
                <NamedInput
                  name='Цена c питанием'
                  title='Цена c питанием'
                  // startValue={praceMeal}
                  type='number'
                  disabled
                />
                <NamedInput
                  name='Цена со скидкой'
                  title='Цена со скидкой'
                  disabled
                  // startValue={praceDiscount}
                />
              </div>

              <div className='grid grid-cols-3 gap-3'>
                <NamedInput
                  name='Количество взрослых'
                  title='Количество проживающих взрослых'
                  getValue={(val) => handleNumberOfAdultsChange(val as number)}
                  startValue={room.number_of_adults}
                />
                <NamedInput
                  name='Количество детей'
                  title='Количество проживающих детей'
                  getValue={(val) => handleNumberOfChildrenChange(val as number)}
                  startValue={room.number_of_children}
                />
                <NamedInput
                  name='Количество одноместных кроватей'
                  title='Количество одноместных кроватей'
                  getValue={(val) => handleSingleBedChange(val as number)}
                  startValue={room.single_bed ?? 0}
                />
                <NamedInput
                  name='Количество двухместных кроватей'
                  title='Количество двухместных кроватей'
                  getValue={(val) => handleDoubleBedChange(val as number)}
                  startValue={room.double_bed ?? 0}
                />
                <NamedInput
                  name='Площадь'
                  title='Площадь, м²'
                  getValue={(val) => handleAreaChange(val as number)}
                  startValue={room.area}
                />
                <NamedInput
                  name='Количество номеров'
                  title='Количество номеров данного типа'
                  getValue={(val) => handleQuantityRoomsChange(val as number)}
                  startValue={room.quantity_rooms}
                />
              </div>

              {/* <DiscountBlock
                startData={room.discount}
                getData={handleDiscountChange}
              /> */}

              {/* <UnavailableBlock
                startData={room.unavailable}
                getData={handleUnavailableChange}
              /> */}

              <PhotosRoom idRoom={room.id} />
            </div>
          </Accordeon>
          <Accordeon title='Удобства'>
            <div className='p-5'>
              <CheckBoxBlock
                title='Общие'
                checkboxes={room.amenities_common}
                getNewList={handleAmenitiesCommonChange}
                className='bg-blue-50'
              />
              <CheckBoxBlock
                title='Кофе-станция'
                checkboxes={room.amenities_coffee}
                getNewList={handleTAmenitiesCoffeeChange}
              />
              <CheckBoxBlock
                title='В ванной комнате'
                checkboxes={room.amenities_bathroom}
                getNewList={handleAmenitiesBathroomChange}
                className='bg-blue-50'
              />
              <CheckBoxBlock
                title='Вид'
                checkboxes={room.amenities_view}
                getNewList={handleAmenitiesViewChange}
              />
            </div>
          </Accordeon>
          <ButtonCustom
            variant='primary'
            size='s'
            className='ml-auto'
            onClick={handleChangeRoom}
          >
            <Typography variant='m-bold'>Сохранить изменения</Typography>
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
}
