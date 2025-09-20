import { IAmenity } from '@/widgets/admin-panel/added-hotel-field/services/arrais';

type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IAmenitiesItem extends DivProps {
  item: IAmenity;
  isChecked: boolean;
  onCheckedChange: (checked: boolean) => void;
}
