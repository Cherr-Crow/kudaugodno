import { IHotel } from '@/types/hotel';
import { RoomType } from '@/types/room';
import { ITour } from '@/types/tour';

type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IHotelBookingPayForm extends DivProps {
  data: {
    checkInDate: string;
    checkOutDate: string;
    guests: number;
    dates: string;
    guestsInfo: string;
    paymentInfo: string;
    resortFee: number;
    flightInfo: {
      flightType: string;
      flightDetails: string;
    };
    flightFrom?: string;
    flightTo?: string;
    departureCountry?: string;
    departureCity?: string;
    arrivalCountry?: string;
    arrivalCity?: string;
    hotelAdress?: string;
    hotelPhoneNumber?: string;
    hotelEmail?: string;
    tourOperator?: string;
    tourOperatorPhoneNumber?: string;
    tourOperatorEmail?: string;
    airCompany?: string;
    cancellationPolicy?: string;
    insurance?: string;
    tourId?: number | null;
    hotelId?: number | null;
    phone?: string;
    email?: string;
    wishes?: string;
    med_insurance_count: number;
    med_insurance_price_per_one: string;
    med_insurance_total_price: string;
    visa_count: number;
    visa_price_per_one: string;
    visa_total_price: string;
    cancellation_insurance_total: string;
    guestsDetails?: {
      pk: number;
      firstname: string;
      lastname: string;
      date_born?: string;
      citizenship?: string;
      international_passport_no?: string;
      validity_international_passport?: string;
    }[];
    hotel?: IHotel | null;
    tour?: ITour | null;
    room?: RoomType | null;
    roomId?: number;
  };
}
