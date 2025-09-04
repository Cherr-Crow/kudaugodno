export interface IFilterCity {
  selectedCities: string[];
  onCityChange: (cities: string[]) => void;
  resetInputTrigger: number;
}
