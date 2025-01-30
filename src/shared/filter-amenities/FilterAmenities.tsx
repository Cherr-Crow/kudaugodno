"use client";

import React, { useState } from "react";
import { Typography } from "../typography";
import { IFilterAmenities } from "./FilterAmenities.types";

export function FilterAmenities({ selectedAmenities, onAmenitiesChange }: IFilterAmenities) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const amenities = [
    "Бассейн",
    "Собственный пляж",
    "Семейные номера",
    "Детский клуб",
    "Аквапарк",
    "Теннисный корт",
    "Ресторан a la carte",
    "Бесплатный интернет",
  ];

  const toggleAmenity = (amenity: string) => {
    const updatedAmenities = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter((item) => item !== amenity)
      : [...selectedAmenities, amenity];

    onAmenitiesChange(updatedAmenities);
  };

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="filter-amenities bg-white p-4 rounded-lg shadow-md">
      {/* Заголовок */}
      <div className="flex justify-between items-center mb-4">
        <Typography variant="l">Удобства</Typography>
        <button
          onClick={toggleCollapse}
          className="text-gray-500"
          aria-label={isCollapsed ? "Развернуть" : "Свернуть"}
        >
          {isCollapsed ? "+" : "–"}
        </button>
      </div>

      {/* Контент с анимацией */}
      <div
        className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
          isCollapsed ? "max-h-0" : "max-h-[1000px]"
        }`}
      >
        {/* Блоки с удобствами */}
        <div className="grid grid-cols-1 gap-2">
          {amenities.map((amenity) => (
            <label
              key={amenity}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedAmenities.includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
                className="accent-blue-500"
              />
              <span className="text-gray-700">{amenity}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

