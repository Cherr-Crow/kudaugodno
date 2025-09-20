import React, { useState, useId, useEffect } from 'react';

import { IFilterCity } from './FilterCity.types';
import { Checkbox } from '../ui/checkbox';
import { SvgSprite } from '../ui/svg-sprite';
import { Typography } from '../ui/typography';
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';

export const FilterCity = ({
  selectedCities,
  onCityChange,
  resetInputTrigger,
}: IFilterCity) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [search, setSearch] = useState('');
  const uniqueId = useId();
  const cities = ['Москва', 'Санкт-Петербург', 'Нижний Новгород', 'Казань'];

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    setSearch('');
  }, [resetInputTrigger]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(search.toLowerCase()),
  );

  const handleCityChange = (city: string) => {
    const isAlreadySelected = selectedCities.includes(city);
    const newSelectedCities = isAlreadySelected
      ? selectedCities.filter((item) => item !== city)
      : [...selectedCities, city];

    onCityChange(newSelectedCities);
  };

  return (
    <div className='filter-city rounded-lg bg-white p-4 shadow-md'>
      {/* Заголовок */}
      <div
        className={`flex items-center justify-between ${isCollapsed ? 'mb-0' : 'mb-4'}`}
      >
        <Typography variant='l' className='text-blue-950'>
          Город назначения
        </Typography>
        <button
          onClick={toggleCollapse}
          className={isCollapsed ? 'mt-1 text-blue-950' : 'text-blue-950'}
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
            id={`city-search-${uniqueId}`}
            name={`city-search-${uniqueId}`}
            value={search}
            onChange={(e) => setSearch(capitalizeFirstLetter(e.target.value))}
            placeholder='Поиск'
            className='w-full rounded-lg border border-grey-300 p-2 pl-10 focus:outline-none focus:ring focus:ring-blue-200'
          />
          <SvgSprite
            name='search'
            className='absolute left-3 top-1/2 -translate-y-1/2 transform text-grey-400'
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
                id={`${uniqueId}-checkbox-${index}`}
                label={city}
                isChecked={selectedCities.includes(city)}
                onChange={() => handleCityChange(city)}
                className='mr-2 text-blue-950'
              />
            </li>
          ))}

          {debouncedSearch &&
            !filteredCities.some(
              (c) => c.toLowerCase() === debouncedSearch.toLowerCase(),
            ) && (
              <li className='mb-2'>
                <Checkbox
                  id={`${uniqueId}-custom-city`}
                  label={debouncedSearch}
                  isChecked={selectedCities.includes(debouncedSearch)}
                  onChange={() => handleCityChange(debouncedSearch)}
                  className='mr-2 text-blue-950'
                />
              </li>
            )}
        </ul>
      </div>
    </div>
  );
};
