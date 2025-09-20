import { IHotel } from '@/types/hotel';

type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IHotelPageContent extends DivProps {
  hotel: IHotel;
}
