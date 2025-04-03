export interface IFlight {
  id: number;
  flight_number: string;
  airline: string;
  departure_airport: string;
  arrival_airport: string;
  departure_date: string;
  departure_time: string;
  arrival_date: string;
  arrival_time: string;
  price: string;
  price_for_child?: string;
  service_class: string;
  flight_type: string;
  description?: string;
}
