type DivProps = React.ComponentPropsWithoutRef<'div'>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IRoomPricing extends DivProps {}

export interface RoomPricingProps {
    price: number; // или string, если цена может быть строкой
}