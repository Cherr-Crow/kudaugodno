// принимает строку - возвращает число, которое есть в строке, если оно есть

export const extractNumber = (text: string): number => {
  const match = text.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};
