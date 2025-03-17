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
    route: 'Москва — Найроби',
    duration: '12ч 55м в пути',
    baggage: ['Без багажа', 'Ручная кладь 1×10 кг'],
    segments: [
      {
        airline: 'Air Arabia',
        flightDuration: '5ч 50м в полете',
        departure: {
          time: '00:20',
          location: 'Москва, Домодедово, DME',
        },
        arrival: {
          time: '07:00',
          location: 'Шарджа, Шарджа, SHJ',
        },
      },
      {
        layover: 'Пересадка в Шардже 2 ч',
      },
      {
        airline: 'Air Arabia',
        flightDuration: '5ч 50м в полете',
        departure: {
          time: '09:00',
          location: 'Шарджа, Шарджа, SHJ',
        },
        arrival: {
          time: '13:15',
          location: 'Найроби, Джомо Кеньятта, NBO',
        },
      },
    ],
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
    route: 'Найроби — Москва',
    duration: '12ч 5м в пути',
    baggage: ['Без багажа', 'Ручная кладь 1×10 кг'],
    segments: [
      {
        airline: 'Air Arabia',
        flightDuration: '5ч 50м в полете',
        departure: {
          time: '14:02',
          location: 'Найроби, Джомо Кеньятта, NBO',
        },
        arrival: {
          time: '20:10',
          location: 'Шарджа, Шарджа, SHJ',
        },
      },
      {
        layover: 'Пересадка в Шардже 1ч 15м',
      },
      {
        airline: 'Air Arabia',
        flightDuration: '5ч 50м в полете',
        departure: {
          time: '21:25',
          location: 'Шарджа, Шарджа, SHJ',
        },
        arrival: {
          time: '02:10',
          location: 'Москва, Домодедово, DME',
        },
      },
    ],
  },
];
