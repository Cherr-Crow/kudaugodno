export const formatDistance = (meters: number): { value: number; unit: string } => {
  if (meters < 1000 && meters >= 0) return { value: meters, unit: 'м' };
  return { value: Math.round(meters / 1000), unit: 'км' };
};
