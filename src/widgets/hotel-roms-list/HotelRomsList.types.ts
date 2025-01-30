export interface HotelRomsListProps {
    id: any;
    hotels: {
        id: number; // или string, в зависимости от вашего ID
        name: string;
        description: string;
        amenities: string[];
        price: number; // или string, если цена может быть строкой
        images: string[];
    }[];
}



