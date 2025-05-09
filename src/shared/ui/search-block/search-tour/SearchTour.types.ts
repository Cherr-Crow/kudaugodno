import { IHotel } from '@/types/hotel';

type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface ISearchTour extends DivProps {
  type?: string;
  hotel?: IHotel | null;
  hotelName?: string;
  departureCity?: string;
  where?: string;
  checkInDate?: string;
  checkOutDate?: string;
  nights?: string;
  guests?: string;
  setHotelName?: (value: string) => void;
  setArrivalCountry?: (value: string) => void;
  setDepartureCity?: (value: string) => void;
  setWhere?: (value: string) => void;
  setCheckInDate?: (value: string) => void;
  setCheckOutDate?: (value: string) => void;
  setNights?: (value: string) => void;
  setGuests?: (value: string) => void;
}
