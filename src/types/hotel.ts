export type Hotel = {
  id: number;
  name: string;
  star_category: number;
  place: string;
  amenities: { 
    id: number; name: string 
  }[];
  country: string;
  city: string;
  address: string;
  distance_to_sea: number;
  distance_to_airport: number;
  description: string;
  rooms: [
    {
      id: number;
      category: {
        id: number;
        name: string;
      };
      food: string;
      type_of_holiday: string;
      smoking: false;
      pet: false;
      area: number;
      amenities: { 
        id: number; name: string 
      }[];
      capacity: number;
      single_bed: null;
      double_bed: number;
      nightly_price: number;
      photos: { 
        id: number; photo: string 
      }[];
    },
    {
      id: number;
      category: {
        id: number;
        name: string;
      };
      food: string;
      type_of_holiday: string;
      smoking: false;
      pet: false;
      area: number;
      amenities: { 
        id: number; name: string 
      }[];
      capacity: number;
      single_bed: null;
      double_bed: number;
      nightly_price: number;
      photos: { 
        id: number; photo: string 
      }[];
    },
  ];
  user_rating: number;
  reviews: {
    id: number;
    username: string;
    userPhoto: string;
    date: string;
    rating: number;
    text: string;
  }[];
  check_in_time: string;
  check_out_time: string;
  photos: { 
    id: number; photo: string 
  }[];
};
