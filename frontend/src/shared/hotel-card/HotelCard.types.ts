import { IHotelMiniData } from '@/types/hotel';
import { ITour } from '@/types/tour';

type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IHotelCard extends DivProps {
  isTour?: boolean;
  index?: number;
  tab?: string;
  item: IHotelMiniData | ITour;
  handleRouting: (params: {
    tourId: number | null;
    hotelId: number;
    hotelName: string;
    hotelCountry: string;
    tab: string;
  }) => void;
}
