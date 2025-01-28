"use client";

import React, { useState } from "react";
import { Typography } from "../typography";
import { IFilterStarCategory } from "./FilterStarCategory.types";
import { SvgSprite } from "../svg-sprite";

export function FilterStarCategory({}: IFilterStarCategory) {
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleStarSelection = (stars: number) => {
    setSelectedStars((prev) =>
      prev.includes(stars)
        ? prev.filter((item) => item !== stars) 
        : [...prev, stars]
    );
  };

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="filter-star-category bg-white p-4 rounded-lg shadow-md">
      {/* Заголовок */}
      <div className="flex justify-between items-center mb-4">
        <Typography variant="l">Категория звезд</Typography>
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
        {/* Категории звезд */}
        <div className="flex flex-wrap gap-4">
          {/* Блоки звёзд */}
          {[5, 4, 3, 2, 1].map((stars) => (
            <div
              key={stars}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition ${
                selectedStars.includes(stars)
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
              onClick={() => toggleStarSelection(stars)}
            >
              <SvgSprite
                name="star"
                width={24}
                className={selectedStars.includes(stars) ? "fill-white" : "fill-blue-700"}
              />
              <span>{stars}</span>
            </div>
          ))}

          {/* Блок "Без звезд" */}
          <div
            className={`px-4 py-2 rounded-lg border cursor-pointer transition ${
              selectedStars.includes(0)
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300"
            }`}
            onClick={() => toggleStarSelection(0)}
          >
            Без звезд
          </div>
        </div>
      </div>
    </div>
  );
}



