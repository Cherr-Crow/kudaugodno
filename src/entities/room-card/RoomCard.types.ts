// eslint-disable-next-line @typescript-eslint/no-unused-vars
type DivProps = React.ComponentPropsWithoutRef<'div'>;


export interface IRoomCard {
    id: number; 
    name: string;
    description: string;
    quadrature: string;
    amenities: string;
    price: number; 
    image: string[];
    hasChild?: boolean;
}