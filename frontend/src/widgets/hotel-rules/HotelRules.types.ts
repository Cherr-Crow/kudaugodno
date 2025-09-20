import { rulesType } from '@/types/hotel';

type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IHotelRules extends DivProps {
  rules: { rules: rulesType[] };
}
