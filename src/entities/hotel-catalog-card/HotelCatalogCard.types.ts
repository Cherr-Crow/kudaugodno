import { IHotelMiniData } from '@/types/hotel';

type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IHotelCatalogCard extends DivProps {
  hotel: IHotelMiniData;
}
