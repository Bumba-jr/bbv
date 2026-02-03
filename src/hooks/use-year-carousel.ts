import { useState } from 'react';

export function useYearCarousel() {
  const currentYearValue = new Date().getFullYear();
  const [currentYear, setCurrentYear] = useState(currentYearValue);

  const changeYear = (direction: number) => {
    setCurrentYear((prev) => prev + direction);
  };

  return { currentYear, changeYear };
}
