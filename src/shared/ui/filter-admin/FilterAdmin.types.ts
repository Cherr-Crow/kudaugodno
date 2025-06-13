import { IFlight } from '@/types/flight';
import { IFilterField } from '@/widgets/admin-panel/table-for-flights/TableForFlights.types';

export interface IFilterAdminProps {
  flights: IFlight[];
  filterField: IFilterField;
  onClose: () => void;
  onFilterChange: (key: IFilterField, values: string[]) => void;
}
