export interface HotelRomsListProps {
    id: unknown;
    hotels: {
        id: number; 
        name: string;
        description: string;
        quadrature: string;
        amenities: string;
        price: number; 
        images: string[];
    }[];
}



