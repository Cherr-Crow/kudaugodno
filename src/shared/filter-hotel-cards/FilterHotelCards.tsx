import { useEffect, useRef, useState } from 'react';

import { FilterHotelCardsProps } from './FilterHotelCards.types';
import { SvgSprite } from '../ui/svg-sprite';

const Popover = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (open && ref.current && !ref.current.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div
      className='relative'
      ref={ref}
      tabIndex={0}
      onBlur={(e) => {
        const nextFocusedElement = e.relatedTarget as Node | null;

        if (!ref.current?.contains(nextFocusedElement)) {
          setOpen(false);
        }
      }}
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className='flex items-center rounded-xl border-grey-700 px-4 py-2 shadow-md'
      >
        {label}
        <SvgSprite name='arrow' className='rotate-90' />
      </button>

      {open && (
        <div
          className='absolute z-10 mt-2 w-[200px] rounded-xl bg-white p-2 shadow-md'
          data-dropdown='true'
        >
          {children}
        </div>
      )}
    </div>
  );
};

export const FilterHotelCards = ({
  rooms,
  selectedFilters,
  setSelectedFilters,
}: FilterHotelCardsProps) => {
  const roomCategories = Array.from(new Set(rooms.map((r) => r.category)));
  const mealTypes = Array.from(
    new Set(rooms.flatMap((r) => r.type_of_meals.map((m) => m.name))),
  );
  const guestsCounts = Array.from(
    new Set(rooms.map((r) => r.number_of_adults + r.number_of_children)),
  ).sort((a, b) => a - b);

  const handleToggleFilter = (
    type: 'category' | 'meals' | 'guests',
    value: string | number,
  ) => {
    setSelectedFilters((prev) => {
      const current = prev[type] as (string | number)[];
      const alreadySelected = current.includes(value);
      const updated = alreadySelected
        ? current.filter((v) => v !== value)
        : [...current, value];

      return {
        ...prev,
        [type]: updated,
      };
    });
  };

  return (
    <>
      <div className='flex-row gap-3 md:flex'>
        <Popover label='Категория номера'>
          {roomCategories.map((value) => (
            <label
              key={value}
              className='flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-grey-50'
            >
              <input
                type='checkbox'
                checked={selectedFilters.category.includes(value)}
                onChange={() => handleToggleFilter('category', value)}
              />
              <span>{value}</span>
            </label>
          ))}
        </Popover>
        <Popover label='Питание'>
          {mealTypes.map((value) => (
            <label
              key={value}
              className='flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-grey-50'
            >
              <input
                type='checkbox'
                checked={selectedFilters.meals.includes(value)}
                onChange={() => handleToggleFilter('meals', value)}
                className='h-4 w-4 rounded text-blue-600'
              />
              <span>{value}</span>
            </label>
          ))}
        </Popover>
        <Popover label='Количество гостей'>
          {guestsCounts.map((value) => (
            <label
              key={value}
              className='flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-grey-50'
            >
              <input
                type='checkbox'
                checked={selectedFilters.guests.includes(value)}
                onChange={() => handleToggleFilter('guests', value)}
                className='h-4 w-4 rounded text-blue-600'
              />
              <span>{value}</span>
            </label>
          ))}
        </Popover>
      </div>
    </>
  );
};
