

export interface IFilterPrice {
    price: [number, number];
    onPriceChange: (price: [number, number]) => void;
}
