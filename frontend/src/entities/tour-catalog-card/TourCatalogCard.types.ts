import { ITour } from '@/types/tour';

type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface ITourCatalogCard extends DivProps {
  tour: ITour;
}
