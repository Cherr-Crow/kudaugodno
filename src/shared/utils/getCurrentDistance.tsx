// Функция для корректного отображения расстояния в карточке отеля (от метро, от центра и пр.)

export const getCurrentDistance = (meters: number): string => {
  const kilometers = meters / 1000;

  if (kilometers > 1) {
    return `${kilometers.toFixed(1)} км от`;
  }

  return `${meters} м от`;
};
