interface IFlightSegment {
  airline?: string;
  flightDuration?: string;
  departure?: {
    time: string;
    location: string;
  };
  arrival?: {
    time: string;
    location: string;
  };
  layover?: string;
}

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
  service_class: string;
  flight_type: string;
  description: string;
  route?: string;
  duration?: string;
  baggage?: string[];
  segments?: IFlightSegment[];
}
