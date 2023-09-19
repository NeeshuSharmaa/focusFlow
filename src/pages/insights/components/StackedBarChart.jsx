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
import {
  generateDateArray,
  generateRandomColor,
  giveMaxY,
} from "./HelperFuncs";
import { secsToHrs } from "../../../features/TimeUtils";
import { useSelector } from "react-redux";
import "./Charts.css";
export default function StackedBarChart() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const labels = generateDateArray();

  const tasks = useSelector((state) => state.tasks.allTasks);
  const datasets = tasks.map(({ name, timeSpent }) => ({
    label: name,
    data: labels.map((date) => {
      const ifTimeSpentOnDate = timeSpent.find(
        ({ date: DATE }) => DATE === date
      );

      if (giveMaxY(tasks, labels).unit === "in hrs") {
        return ifTimeSpentOnDate ? secsToHrs(ifTimeSpentOnDate.elapsedTime) : 0;
      } else if (giveMaxY(tasks, labels).unit === "in mins") {
        return ifTimeSpentOnDate ? ifTimeSpentOnDate.elapsedTime / 60 : 0;
      } else {
        return ifTimeSpentOnDate ? ifTimeSpentOnDate.elapsedTime : 0;
      }
    }),
    backgroundColor: generateRandomColor(),
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
        max: giveMaxY(tasks, labels).value,
        title: {
          display: true,
          text: `Elapsed time (${giveMaxY(tasks, labels).unit})`,
        },
      },
    },
  };

  const data = {
    labels,
    datasets,
  };

  const legendHtml = datasets.map((dataset, index) => {
    return dataset.data.reduce((acc, curr) => acc + curr, 0) ? (
      <div className="legend" key={index}>
        <div
          className="legend-color"
          style={{
            backgroundColor: dataset.backgroundColor,
          }}
        ></div>
        <span>{dataset.label}</span>
      </div>
    ) : null;
  });

  return (
    <div className="stacked-bar-chart">
      <Bar options={options} data={data} className="chart" />
      {/* <div className="legends-outer">{legendHtml}</div> */}
    </div>
  );
}
