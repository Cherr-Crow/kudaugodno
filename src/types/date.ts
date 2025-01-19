export type date = {
  date: string;
  available_for_booking: boolean;
  promotions: boolean;
  available_rooms: { category: string; cost_per_day: number }[];
  discount_amount: number;
};
