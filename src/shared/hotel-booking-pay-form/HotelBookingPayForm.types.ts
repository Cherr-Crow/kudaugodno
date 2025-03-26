type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IHotelBookingPayForm extends DivProps {
  data: {
    dates: string;
    guestsInfo: string;
    paymentInfo: string;
    resortFee: string;
    flightInfo: {
      flightType: string;
      flightDetails: string;
    };
    email: string;
    phone: string;
  };
}
