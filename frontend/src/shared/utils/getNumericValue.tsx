// Принимает строку и возвращает число, если оно есть в строке

export const getNumericValue = (str: string): string | null => {
  const match = str.match(/\d+/);
  return match ? match[0] : null;
};
