export interface ITourist {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  avatar?: string;
  birth_date?: string;
  role?: 'USER';
  currency?: 'RUB' | 'EUR' | 'USD';
  language?: 'RU' | 'EN';
  notifications_enabled?: boolean;
  preferred_contact_channel?: 'Телефон' | 'Email';
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
