// eslint-disable-next-line @typescript-eslint/no-unused-vars
type DivProps = React.ComponentPropsWithoutRef<'div'>;


export interface IRoomCard {
    id: number; // или string, в зависимости от вашего ID
    name: string;
    description: string;
    quadrature: string;
    amenities: string;
    price: number; // или string, если цена может быть строкой
    image: string[];
}