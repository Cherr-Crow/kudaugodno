import { IFlight } from '@/types/flight-type';

type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface ITableForFlights extends DivProps {
  flights: IFlight[];
}
