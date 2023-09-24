import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { doughnutHelpers } from "./ChartHelper";
import { useSelector } from "react-redux";
import "./Styles.css";

export function DoughnutChart({ colors, dates }) {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const tasks = useSelector((state) => state.tasks.allTasks);

  const doughnut = doughnutHelpers(tasks, dates);

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
    maintainAspectRatio: false,
  };

  const data = {
    labels: doughnut.labels,
    datasets: [
      {
        data: doughnut.dataForDatasets,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="d-chart">
      <Doughnut data={data} options={options} className="chart" />
    </div>
  );
}
