type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IFilterCountry extends DivProps {
  selectedCountries: string[];
  onCountryChange: (selected: string[]) => void;
  resetInputTrigger: number;
}
