
export interface IFilterRating {
    rating: [number, number];
    onRatingChange: (rating: [number, number]) => void;
}
