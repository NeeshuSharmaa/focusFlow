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
import { generateDateArray, generateRandomColor } from "./HelperFuncs";
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

  const options = {
    plugins: {
      title: {
        display: true,
        text: "",
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
        max: 300,
        title: {
          display: true,
          text: "Elapsed Time (hours)",
        },
      },
    },
  };

  const labels = generateDateArray();

  const tasks = useSelector((state) => state.tasks.allTasks);
  const datasets = tasks.map(({ name, timeSpent }) => ({
    label: name,
    data: labels.map((date) => {
      const ifTimeSpentOnDate = timeSpent.find(({ date: DATE }) => {
        console.log(DATE, date);
        return DATE === date;
      });
      // return ifTimeSpentOnDate ? secsToHrs(ifTimeSpentOnDate.elapsedTime) : 0;
      return ifTimeSpentOnDate ? ifTimeSpentOnDate.elapsedTime : 0;
    }),
    backgroundColor: generateRandomColor(),
  }));

  const data = {
    labels,
    datasets,
  };

  const legendHtml = datasets.map((dataset, index) => {
    console.log(dataset.data);
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
      <Bar options={options} data={data} />
      <div className="legends-outer">{legendHtml}</div>
    </div>
  );
}
