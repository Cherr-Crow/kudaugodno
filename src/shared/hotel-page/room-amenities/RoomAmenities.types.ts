type DivProps = React.ComponentPropsWithoutRef<'div'>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IRoomAmenities extends DivProps {}

export interface RoomAmenitiesProps {
    amenities: string; // Предположим, что amenities - это массив строк. Измените по мере необходимости.
}