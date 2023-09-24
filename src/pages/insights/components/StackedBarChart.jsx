import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

import { secsToHrs } from "../../../features/TimeUtils";
import { useSelector } from "react-redux";
import "./Styles.css";
import { giveMaxY } from "./ChartHelper";

export default function StackedBarChart({ colors, dates }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const tasks = useSelector((state) => state.tasks.allTasks);
  const datasets = tasks.map(({ name, timeSpent }, index) => ({
    label: name,
    data: dates.map((date) => {
      const ifTimeSpentOnDate = timeSpent.find(
        ({ date: DATE }) => DATE === date
      );

      if (giveMaxY(tasks, dates).unit === "in hrs") {
        return ifTimeSpentOnDate ? secsToHrs(ifTimeSpentOnDate.elapsedTime) : 0;
      } else if (giveMaxY(tasks, dates).unit === "in mins") {
        return ifTimeSpentOnDate ? ifTimeSpentOnDate.elapsedTime / 60 : 0;
      } else {
        return ifTimeSpentOnDate ? ifTimeSpentOnDate.elapsedTime : 0;
      }
    }),
    backgroundColor: colors[index],
  }));

  const options = {
    plugins: {
      title: {
        display: true,
        text: "time/task per day weekly report",
      },
      legend: {
        display: false,
      },
    },
    responsive: true,

    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        max: giveMaxY(tasks, dates).value,
        title: {
          display: true,
          text: `Elapsed time (${giveMaxY(tasks, dates).unit})`,
        },
      },
    },
  };

  const data = {
    labels: dates,
    datasets,
  };

  return (
    <div className="stacked-bar-chart">
      <Bar options={options} data={data} className="chart" />
    </div>
  );
}
