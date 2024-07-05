// Функция для перевода пикселей в vw
export const ptw = (size: number, width: number = 1920): string => {
  const result = (size / width) * 100;
  return result.toFixed(3) + "vw";
};
