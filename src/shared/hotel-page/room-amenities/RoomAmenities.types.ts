type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IRoomAmenities extends DivProps {}

export interface RoomAmenitiesProps {
    amenities: string[]; // Предположим, что amenities - это массив строк. Измените по мере необходимости.
}