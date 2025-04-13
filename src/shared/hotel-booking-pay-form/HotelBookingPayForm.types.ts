type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IHotelBookingPayForm extends DivProps {
  data: {
    hotelName: string;
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
    hotelAdress?: string;
    hotelPhoneNumber?: string;
    hotelEmail?: string;
    tourOperator?: string;
    tourOperatorPhoneNumber?: string;
    tourOperatorEmail?: string;
    airCompany?: string;
    cancellationPolicy?: string;
    insurance?: string;
    tourId?: number;
    hotelId?: number;
    phone?: string;
    email?: string;
    wishes?: string;
    med_insurance?: boolean;
    visa?: boolean;
    cancellation_insurance?: boolean;
    guestsDetails?: {
      pk: number;
      firstname: string;
      lastname: string;
      date_born?: string;
      citizenship?: string;
      international_passport_no?: string;
      validity_international_passport?: string;
    }[];
  };
}
