import { IFlight } from '@/types/flight';

type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface ITableForFlights extends DivProps {
  flights: IFlight[];
}

export type ISortField =
  | 'arrival_city'
  | 'departure_city'
  | 'airline'
  | 'departure_date';
export type IFilterField = 'airline' | 'departure_country' | 'arrival_country';

export interface IFilters {
  airline: string[];
  departure_country: string[];
  arrival_country: string[];
}

export interface ISortingState {
  field: ISortField | null;
  order: 'asc' | 'desc';
}

export interface IContextMenuState {
  isVisible: boolean;
  position: { x: number; y: number };
  activeItem: number | null; // Может быть и number, и null
}
