export interface IGuest {
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
    avatar: string | null;
    birth_date: string | null;
    role: string;
  };
}
