// Принимает строку и возвращает строку с первой буквой в верхнем регистре

export const capitalizeFirstLetter = (str: string) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
