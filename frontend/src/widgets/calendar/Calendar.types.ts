type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface ICalendar extends DivProps {
  month: number;
  year: number;
}
