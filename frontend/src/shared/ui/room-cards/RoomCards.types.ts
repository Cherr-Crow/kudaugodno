type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IRoomCards extends DivProps {
  name: string;
  tourId?: number;
  roomId?: number;
  tour_operator: string;
  // nights: number;
  guests: number;
  formatted_date?: string;
  startDate: string;
  endDate: string;
  photos: { photo: string }[];
  meal: string;
  flight_info: {
    type: string;
    airline: string;
  };
  total_price?: number;
}
export interface IDateTimeFormatOptions {
  year?: 'numeric' | '2-digit';
  month?: 'long' | 'short' | 'narrow';
  day?: 'numeric' | '2-digit';
  weekday?: 'long' | 'short' | 'narrow';
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: 'numeric' | '2-digit';
}
