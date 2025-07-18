import { IHotelMiniData } from '@/types/hotel';
import { ITourMiniData } from '@/types/tour';

type DivProps = React.ComponentPropsWithoutRef<'article'>;

export interface IOfferCard extends DivProps {
  offer: IHotelMiniData | ITourMiniData;
  needHotelBadges?: boolean;
}
