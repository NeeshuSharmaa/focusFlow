import { getDateInFormat } from "../../../features/TimeUtils";

export const generateRandomColor = () => {
  const min = 150;
  const max = 255;

  const r = Math.floor(Math.random() * (max - min + 1) + min);
  const g = Math.floor(Math.random() * (max - min + 1) + min);
  const b = Math.floor(Math.random() * (max - min + 1) + min);

  const color = `rgb(${r},${g},${b})`;

  return color;
};
export const generateBgColorsArr = (n) => {
  let colorsArr = [];
  for (let i = 0; i <= n; i++) {
    colorsArr = [...colorsArr, generateRandomColor()];
  }

  return colorsArr;
};

export const generateDateArray = () => {
  const currentDate = new Date();
  let dateArray = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(currentDate);

    date.setDate(currentDate.getDate() - i);

    dateArray = [...dateArray, getDateInFormat(date)];
  }

  return dateArray;
};

export const doughnutHelpers = (tasks, dates) => {
  const tasksWithTimeSpent = tasks.reduce((acc, { name, timeSpent }) => {
    const time = timeSpent.reduce(
      (acc, { date: DATE, elapsedTime }) =>
        dates.some((date) => date === DATE) ? acc + elapsedTime : acc,
      0
    );
    return [...acc, { name, time }];
  }, []);

  const labels = tasksWithTimeSpent.map(({ name }) => name);
  const dataForDatasets = tasksWithTimeSpent.map(({ time }) => time);

  return { labels, dataForDatasets };
};

export const giveMaxY = (allTasks, labelDates) => {
  if (allTasks.length) {
    const timeSpentByTasksPerLabelDates = allTasks.map(({ timeSpent }) =>
      labelDates.map((date) => {
        const isTimeSpentOnDate = timeSpent.find(
          ({ date: DATE }) => DATE === date
        );
        return isTimeSpentOnDate ? isTimeSpentOnDate.elapsedTime : 0;
      })
    );

    const totalTimeSpentByAllTasksPerDay = timeSpentByTasksPerLabelDates.reduce(
      (acc, curr) =>
        curr.map(
          (time, index) => time + acc[index],
          [...timeSpentByTasksPerLabelDates[0]]
        )
    );
    const maxValue = Math.max(...totalTimeSpentByAllTasksPerDay);

    if (maxValue < 60) {
      return { unit: "in secs", value: Math.ceil(maxValue / 10) * 10 };
    } else if (maxValue > 60 && maxValue < 3600) {
      return { unit: "in mins", value: Math.ceil(maxValue / 60 / 10) * 10 };
    } else {
      return { unit: "in hrs", value: Math.ceil(maxValue / 3600 / 10) * 10 };
    }
  } else {
    return { unit: "in secs", value: 60 };
  }
};
