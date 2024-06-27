// Функция для перевода пикселей в vw
export const ptw = (size: number, width = 1920) => {
  const result = (size / width) * 100;
  return result.toFixed(3) + "vw";
};
