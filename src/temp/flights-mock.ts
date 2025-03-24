import { IFlight } from '@/types/flight-type';

export const flights: IFlight[] = [
  {
    id: 0,
    flight_number: 'G9-955',
    airline: 'Air Arabia',
    departure_airport: 'Домодедов, DME',
    arrival_airport: 'Шаржа, SHJ',
    departure_date: '2025-07-15',
    departure_time: '00:20',
    arrival_date: '2025-07-15',
    arrival_time: '07:00',
    price: '450.00',
    service_class: 'Эконом',
    flight_type: 'Международный',
    description: 'Рейс Москва - Найроби с пересадкой в Шардже',
  },
  {
    id: 1,
    flight_number: 'G9-657',
    airline: 'Air Arabia',
    departure_airport: 'Шаржа, SHJ',
    arrival_airport: 'Джомо Кеньятта, NBO',
    departure_date: '2025-07-15',
    departure_time: '09:00',
    arrival_date: '2025-07-15',
    arrival_time: '13:15',
    price: '450.00',
    service_class: 'Эконом',
    flight_type: 'Международный',
    description: 'Продолжение рейса Москва - Найроби',
  },
];
