import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { doughnutHelpers } from "./HelperFuncs";
import { useSelector } from "react-redux";

export function DoughnutChart() {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const tasks = useSelector((state) => state.tasks.allTasks);

  const doughnut = doughnutHelpers(tasks);

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
    maintainAspectRatio: true,
  };

  const data = {
    labels: doughnut.labels,
    datasets: [
      {
        data: doughnut.dataForDatasets,
        backgroundColor: doughnut.colorsForArcs,
        borderColor: doughnut.colorsForArcs,
        borderWidth: 1,
      },
    ],
  };
  return (
    <div style={{ width: "100%" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}
