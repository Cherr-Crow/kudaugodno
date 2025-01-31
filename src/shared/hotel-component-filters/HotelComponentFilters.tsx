import React, { useState } from 'react';
import { FilterCity } from '../filter-city';


interface FilterComponentFiltersProps {
  onReset: () => void;
}

export const FilterComponentFilters: React.FC<FilterComponentFiltersProps> = ({ onReset }) => {
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [recreationType, setRecreationType] = useState<string[]>([]);
  const [placeType, setPlaceType] = useState<string[]>([]);
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [starCategory, setStarCategory] = useState('');
  const [mealType, setMealType] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);

  // Функция для сброса всех фильтров
  const resetFilters = () => {
    setSelectedCities([]);
    setRecreationType([]);
    setPlaceType([]);
    setPrice('');
    setRating('');
    setStarCategory('');
    setMealType([]);
    setAmenities([]);
    onReset();
  };

  return (
    <div className='filter-section mb-6'>

      <FilterCity selectedCities={selectedCities} onCityChange={setSelectedCities} />

      {/*  другие фильтры  */}
      
    
    </div>
  );
};
