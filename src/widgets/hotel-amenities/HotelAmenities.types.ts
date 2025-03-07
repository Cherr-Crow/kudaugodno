type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IHotelAmenities extends DivProps {
  amenities: {
    common: string[];
    children: string[];
    in_the_room: string[];
    sports_and_recreation: string[];
  };
}
