import { IAmenity } from '../admin-panel/added-hotel-field/services/arrais';

type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IAmenitiesChangeBlock extends DivProps {
  checkboxes: IAmenity[];
  getNewList(list: IAmenity[]): void;
}
