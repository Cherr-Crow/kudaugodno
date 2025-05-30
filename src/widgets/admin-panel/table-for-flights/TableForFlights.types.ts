import { IFlight } from '@/types/flight';

type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface ITableForFlights extends DivProps {
  flights: IFlight[];
}
