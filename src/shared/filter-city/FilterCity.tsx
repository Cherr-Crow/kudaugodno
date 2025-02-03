import React, { useState } from 'react';

import { IFilterCity } from './FilterCity.types';
import { SvgSprite } from '../svg-sprite';
import { Typography } from '../typography';
import { Checkbox } from '../ui/checkbox';

export const FilterCity = ({ selectedCities, onCityChange }: IFilterCity) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [search, setSearch] = useState('');
  const cities = [
    'Москва',
    'Санкт-Петербург',
    'Нижний Новгород',
    'Казань',
    'Найроби',
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(search.toLowerCase()),
  );

  const handleCityChange = (city: string) => {
    const newSelectedCities = selectedCities.includes(city)
      ? selectedCities.filter((item) => item !== city)
      : [...selectedCities, city];
    onCityChange(newSelectedCities);
  };

  return (
    <div className='filter-city rounded-lg bg-white p-4 shadow-md'>
      {/* Заголовок */}
      <div className='mb-4 flex items-center justify-between'>
        <Typography variant='l'>Город назначения</Typography>
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
        <div className='relative mb-4'>
          <input
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Поиск'
            className='border-gray-300 w-full rounded-lg border p-2 pl-10 focus:outline-none focus:ring focus:ring-blue-200'
          />
          <SvgSprite
            name='search'
            className='text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 transform'
            width={20}
            height={20}
          />
        </div>
      )}

      {/* Список городов */}
      <div
        className={`transition-max-height overflow-hidden duration-300 ease-in-out ${
          isCollapsed ? 'max-h-0' : 'max-h-screen'
        }`}
      >
        <ul>
          {filteredCities.map((city, index) => (
            <li key={index} className='mb-2'>
              <Checkbox
                label={city}
                isChecked={selectedCities.includes(city)}
                onChange={() => handleCityChange(city)}
                className='mr-2'
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
