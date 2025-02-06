type DivProps = React.ComponentPropsWithoutRef<'section'>;

export interface IAddedHotelField extends DivProps {
  hotel: { id: number; name: string };
}
