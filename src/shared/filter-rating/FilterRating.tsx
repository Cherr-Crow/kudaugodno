"use client";

import React, { useState, useRef, useEffect } from "react";
import { Typography } from "../typography";
import { IFilterRating } from "./FilterRating.types";

export function FilterRating({
  rating, 
  onRatingChange 
}: IFilterRating) {
  const [ratingRange, setRatingRange] = useState<[number, number]>(rating);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const minRating = 1;
  const maxRating = 10;

  const histogramData = [
    6.74, 2.15, 1.15, 9.59, 5.71, 1.75, 6.46, 6.68, 5.18, 8.33, 4.55, 7.87,
    3.21, 8.02, 5.91, 2.45, 7.13, 6.02, 3.88, 7.75, 9.11, 8.11, 3.45, 6.99,
    4.93, 6.21,
  ];

  const frequencyData = Array(10).fill(0);

  histogramData.forEach((value) => {
    const roundedValue = Math.round(value);
    if (roundedValue >= 1 && roundedValue <= 10) {
      frequencyData[roundedValue - 1] += 1;
    }
  });

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef<"left" | "right" | null>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingRef.current || !sliderRef.current) return;

    const sliderRect = sliderRef.current.getBoundingClientRect();
    const relativeX = Math.min(
      Math.max(e.clientX - sliderRect.left, 0),
      sliderRect.width
    );
    const percentage = relativeX / sliderRect.width;
    const newRating = parseFloat(
      (minRating + percentage * (maxRating - minRating)).toFixed(1)
    );

    setRatingRange((prev) => {
      if (isDraggingRef.current === "left") {
        return [Math.min(newRating, prev[1] - 0.1), prev[1]];
      } else {
        return [prev[0], Math.max(newRating, prev[0] + 0.1)];
      }
    });
  };

  const handleMouseDown = (side: "left" | "right") => {
    isDraggingRef.current = side;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    onRatingChange(ratingRange);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="filter-rating bg-white p-2 rounded-lg shadow-md">
      {/* Заголовок */}
      <div className="flex justify-between items-center mb-4">
        <Typography variant="l">Рейтинг</Typography>
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
        className={`transition-max-height duration-500 p-4 ease-in-out overflow-hidden ${
          isCollapsed ? "max-h-0" : "max-h-[1000px]"
        }`}
      >
        {/* Гистограмма */}
        <div className="histogram h-16 bg-gray-100 rounded-lg mb-4 relative flex gap-1 items-end">
          {frequencyData.map((frequency, index) => {
            const heightPercentage = (frequency / Math.max(...frequencyData)) * 100;
            return (
              <div
                key={index}
                className="flex-1 bg-blue-300"
                style={{ height: `${heightPercentage}%` }}
              ></div>
            );
          })}
        </div>

        {/* Слайдер для выбора диапазона рейтинга */}
        <div
          className="slider relative h-1 bg-gray-200 rounded-lg mb-4"
          ref={sliderRef}
        >
          {/* Диапазон (заливка между ползунками) */}
          <div
            className="absolute h-1 bg-blue-800 rounded-lg"
            style={{
              left: `${
                ((ratingRange[0] - minRating) / (maxRating - minRating)) * 100
              }%`,
              width: `${
                ((ratingRange[1] - ratingRange[0]) / (maxRating - minRating)) *
                100
              }%`,
            }}
          ></div>

          {/* Левый ползунок */}
          <div
            className="absolute w-4 h-4 bg-blue-800 rounded-full cursor-pointer"
            style={{
              left: `${
                ((ratingRange[0] - minRating) / (maxRating - minRating)) * 100
              }%`,
              transform: "translate(-50%, -50%)",
              top: "50%",
            }}
            onMouseDown={() => handleMouseDown("left")}
          ></div>

          {/* Правый ползунок */}
          <div
            className="absolute w-4 h-4 bg-blue-800 rounded-full cursor-pointer"
            style={{
              left: `${
                ((ratingRange[1] - minRating) / (maxRating - minRating)) * 100
              }%`,
              transform: "translate(-50%, -50%)",
              top: "50%",
            }}
            onMouseDown={() => handleMouseDown("right")}
          ></div>
        </div>

        {/* Диапазон рейтингов */}
        <div className="flex justify-between text-sm">
          <span>{ratingRange[0].toFixed(1)}</span>
          <span>{ratingRange[1].toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}

