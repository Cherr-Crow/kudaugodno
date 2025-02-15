export type THotel = {
  amenities_common: [string];
  amenities_in_the_room: [string];
  amenities_sports_and_recreation: [string];
  amenities_for_children: [string];
  is_active: true;
  photo: [
    {
      id: 0;
      photo: string;
      hotel: 0;
    },
  ];
};

export type TRoom = {
  // type_of_meal: [string];
  amenities_common: [string];
  amenities_coffee: [string];
  amenities_bathroom: [string];
  amenities_view: [string];
  photo: [
    {
      id: 0;
      photo: string;
      room: 0;
    },
  ];
};

//
// в номере hotel_id не учавствует, потому что его hotel_id передаётся в ссылке
// http://127.0.0.1:8000/api/v1/hotels/2301/rooms/
//   2301 - это как раз hotel_id, поэтому нет смысла при создании его пихать
