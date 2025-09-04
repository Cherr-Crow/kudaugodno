import React, { useState, useId, useEffect } from 'react';

import { IFilterCountry } from './FilterCountry.types';
import { Checkbox } from '../ui/checkbox';
import { SvgSprite } from '../ui/svg-sprite';
import { Typography } from '../ui/typography';
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';

export const FilterCountry = ({
  selectedCountries,
  onCountryChange,
  resetInputTrigger,
}: IFilterCountry) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [search, setSearch] = useState('');
  const uniqueId = useId();

  const countries = ['Россия', 'Турция', 'Египет', 'ОАЭ'];

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

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(search.toLowerCase()),
  );

  const handleCountryChange = (country: string) => {
    const isAlreadySelected = selectedCountries.includes(country);
    const newSelectedCountries = isAlreadySelected
      ? selectedCountries.filter((item) => item !== country)
      : [...selectedCountries, country];

    onCountryChange(newSelectedCountries);
  };

  return (
    <div className='filter-country rounded-lg bg-white p-4 shadow-md'>
      {/* Заголовок */}
      <div
        className={`flex items-center justify-between ${isCollapsed ? 'mb-0' : 'mb-4'}`}
      >
        <Typography variant='l' className='text-blue-950'>
          Страна назначения
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
            id={`country-search-${uniqueId}`}
            name={`country-search-${uniqueId}`}
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

      {/* Список стран */}
      <div
        className={`transition-max-height overflow-hidden duration-300 ease-in-out ${
          isCollapsed ? 'max-h-0' : 'max-h-screen'
        }`}
      >
        <ul>
          {filteredCountries.map((country, index) => (
            <li key={index} className='mb-2'>
              <Checkbox
                id={`${uniqueId}-checkbox-${index}`}
                label={country}
                isChecked={selectedCountries.includes(country)}
                onChange={() => handleCountryChange(country)}
                className='mr-2 text-blue-950'
              />
            </li>
          ))}

          {debouncedSearch &&
            !filteredCountries.some(
              (c) => c.toLowerCase() === debouncedSearch.toLowerCase(),
            ) && (
              <li className='mb-2'>
                <Checkbox
                  id={`${uniqueId}-custom-country`}
                  label={debouncedSearch}
                  isChecked={selectedCountries.includes(debouncedSearch)}
                  onChange={() => handleCountryChange(debouncedSearch)}
                  className='mr-2 text-blue-950'
                />
              </li>
            )}
        </ul>
      </div>
    </div>
  );
};
