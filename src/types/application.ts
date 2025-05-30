import { IHotel } from './hotel';
import { RoomType } from './room';
import { ITour } from './tour';

export interface IApplication {
  id: number;
  email: string;
  phone_number: string;
  visa: boolean;
  med_insurance: boolean;
  cancellation_insurance: boolean;
  wishes: string;
  status: string;
  quantity_guests: IQuantityGuests[];
}

export interface IApplicationTour extends IApplication {
  tour: ITour;
}

export interface IApplicationHotel extends IApplication {
  hotel: Omit<IHotel, 'rooms'>;
  room: RoomType[];
}

export interface IQuantityGuests {
  pk: number;
  firstname: string;
  lastname: string;
  surname: string;
  date_born: string;
  citizenship: string;
  russian_passport_no: string;
  international_passport_no: string;
  validity_international_passport: string;
  user_owner: string;
}

export interface IApplicationRequest {
  tour: number;
  email: string;
  phone_number: string;
  quantity_guests: number[];
  visa: boolean;
  med_insurance: boolean;
  cancellation_insurance: boolean;
  wishes: string;
}
