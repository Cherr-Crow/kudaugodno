"use client";

import React, { useState } from "react";
import { Typography } from "../typography";
import { IFilterTypeOfMeals } from "./FilterTypeOfMeals.types";

export function FilterTypeOfMeals({ selectedMeals, onMealChange }: IFilterTypeOfMeals) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const mealOptions = [
    "Без питания",
    "Ultra all inclusive",
    "All inclusive",
    "Полный пансион",
    "Полупансион",
    "Только завтраки",
  ];

  const toggleMealSelection = (meal: string) => {
    const updatedMeals = selectedMeals.includes(meal)
      ? selectedMeals.filter((item) => item !== meal)
      : [...selectedMeals, meal];

    onMealChange(updatedMeals);
  };

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="filter-type-of-meals bg-white p-4 rounded-lg shadow-md">
      {/* Заголовок */}
      <div className="flex justify-between items-center mb-4">
        <Typography variant="l">Тип питания</Typography>
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
        {/* Опции питания с чекбоксами */}
        <div className="grid grid-cols-1 gap-2">
          {mealOptions.map((meal) => (
            <div key={meal} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={meal}
                checked={selectedMeals.includes(meal)}
                onChange={() => toggleMealSelection(meal)}
                className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <label htmlFor={meal} className="text-gray-700">
                {meal}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


