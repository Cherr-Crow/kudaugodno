type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface ISearchBlock extends DivProps {
  tab?: 'Туры' | 'Отели';
  setTab?: (tab: 'Туры' | 'Отели') => void;
  departureCity?: string;
  where?: string;
  checkInDate?: string;
  checkOutDate?: string;
  nights?: string;
  guests?: string;
  setDepartureCity?: (value: string) => void;
  setWhere?: (value: string) => void;
  setCheckInDate?: (value: string) => void;
  setCheckOutDate?: (value: string) => void;
  setNights?: (value: string) => void;
  setGuests?: (value: string) => void;
}
