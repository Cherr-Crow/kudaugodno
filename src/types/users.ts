export interface ITourist {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  avatar?: string;
  birth_date: string;
  role?: 'TOURIST';
}

export interface ICompany {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  avatar?: string;
  birth_date?: string;
  role?: 'TOUR_OPERATOR' | 'HOTELIER';
  company_name: string;
  documents?: string;
}
