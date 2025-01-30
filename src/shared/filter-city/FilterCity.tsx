import React, { useState } from 'react';
import { IFilterCity } from './FilterCity.types';
import { Typography } from '../typography';
import { SvgSprite } from '../svg-sprite';

export const FilterCity = ({ selectedCities, onCityChange }: IFilterCity) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [search, setSearch] = useState('');
  const cities = ['Москва', 'Санкт-Петербург', 'Нижний Новгород', 'Казань', 'Найроби'];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(search.toLowerCase())
  );


  const handleCityChange = (city: string) => {
    const newSelectedCities = selectedCities.includes(city)
      ? selectedCities.filter((item) => item !== city)
      : [...selectedCities, city];
    onCityChange(newSelectedCities); 
  };

  return (
    <div className="filter-city bg-white p-4 rounded-lg shadow-md">
      {/* Заголовок */}
      <div className="flex justify-between items-center mb-4">
        <Typography variant="l">Город назначения</Typography>
        <button
          onClick={toggleCollapse}
          className={isCollapsed ? 'text-gray-500 mt-1' : 'text-gray-500'}
          aria-label={isCollapsed ? 'Развернуть' : 'Свернуть'}
        >
          {isCollapsed ? '+' : '–'}
        </button>
      </div>

      {/* Поле поиска */}
      {!isCollapsed && (
        <div className="relative mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск"
            className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
          />
          <SvgSprite
            name="search"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            width={20}
            height={20}
          />
        </div>
      )}

      {/* Список городов */}
      <div
        className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
          isCollapsed ? 'max-h-0' : 'max-h-screen'
        }`}
      >
        <ul>
          {filteredCities.map((city, index) => (
            <li key={index} className="mb-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCities.includes(city)}
                  onChange={() => handleCityChange(city)}
                  className="mr-2 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Typography variant="m">{city}</Typography>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};



