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
