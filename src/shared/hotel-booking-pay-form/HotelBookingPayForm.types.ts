type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IHotelBookingPayForm extends DivProps {
  data: {
    hotelName: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    dates: string;
    guestsInfo: string;
    paymentInfo: string;
    resortFee: number;
    flightInfo: {
      flightType: string;
      flightDetails: string;
    };
    tourId?: number;
    hotelId?: number;
  };
}
