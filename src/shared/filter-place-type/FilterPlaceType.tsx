"use client";

import React, { useState } from "react";
import { Typography } from "../typography";
import { IFilterPlaceType } from "./FilterPlaceType.types";

export function FilterPlaceType({
  selectedPlaceTypes,
  onPlaceTypeChange,
}: IFilterPlaceType) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const placeTypes = [
    "Хостел",
    "Вилла",
    "Апартаменты",
    "Отель",
    "Гостевой дом",
    "Гостиница",
  ];

  const toggleSelection = (type: string) => {
    onPlaceTypeChange(
      selectedPlaceTypes.includes(type)
        ? selectedPlaceTypes.filter((item) => item !== type)
        : [...selectedPlaceTypes, type] 
    );
  };

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="filter-place-type bg-white p-4 rounded-lg shadow-md">
      {/* Заголовок */}
      <div className="flex justify-between items-center mb-4">
        <Typography variant="l">Тип размещения</Typography>
        <button
          onClick={toggleCollapse}
          className={isCollapsed ? "text-gray-500 mt-1" : "text-gray-500"}
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
        {/* Блоки с типами размещения */}
        <div className="flex flex-wrap gap-4">
          {placeTypes.map((type) => (
            <button
              key={type}
              onClick={() => toggleSelection(type)}
              className={`p-4 text-center rounded-lg border transition-all ${
                selectedPlaceTypes.includes(type)
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


