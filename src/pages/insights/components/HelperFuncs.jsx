import { getDateInFormat } from "../../../features/TimeUtils";

export const generateRandomColor = () => {
  const min = 140;
  const max = 255;

  const r = Math.floor(Math.random() * (max - min + 1) + min);
  const g = Math.floor(Math.random() * (max - min + 1) + min);
  const b = Math.floor(Math.random() * (max - min + 1) + min);

  const color = `rgb(${r},${g},${b})`;

  return color;
};

export const generateDateArray = () => {
  const currentDate = new Date();
  let dateArray = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(currentDate);

    date.setDate(currentDate.getDate() - i); // this is Date object property in js
    dateArray = [...dateArray, getDateInFormat(date)];
    // this is my func but the doubt is how the code knows which one
    // is used where as they both ahve the same name ( i changed the name for now)
  }

  return dateArray;
};
