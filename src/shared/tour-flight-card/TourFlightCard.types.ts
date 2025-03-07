export interface IFlightSegment {
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

export interface ITourFlightCard {
  flights: {
    route: string;
    duration: string;
    baggage: string[];
    segments: IFlightSegment[];
  }[];
}
