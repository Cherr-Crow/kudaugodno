import { ITour } from './tour-type';

export interface IApplication {
  pk: number;
  status: string;
  tour: ITour;
  email: string;
  phone_number: string;
  quantity_guests: {
    pk: number;
    firstname: string;
    lastname: string;
    surname: string;
    date_born: string;
    citizenship: string;
    russian_passport_no: string;
    international_passport_no: string;
    validity_international_passport: string;
    user_owner: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      phone_number: string;
      avatar: null | string;
      birth_date: null | string;
      role: string;
    };
  }[];
  visa: boolean;
  med_insurance: boolean;
  cancellation_insurance: boolean;
  wishes: string;
}
