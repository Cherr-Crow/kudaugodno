type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IRoomPricing extends DivProps {}

export interface RoomPricingProps {
    price: number; // или string, если цена может быть строкой
}