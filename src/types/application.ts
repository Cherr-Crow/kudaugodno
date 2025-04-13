// Интерфейс одной заявки
export interface IApplication {
  id: number;
  tour: number;
  email: string;
  phone_number: string;
  quantity_guests: number[];
  visa: boolean;
  med_insurance: boolean;
  cancellation_insurance: boolean;
  wishes: string;
}

// Список заявок
export interface IResponseApplicationsList {
  count: number;
  next: string | null;
  previous: string | null;
  results: IApplication[];
}
