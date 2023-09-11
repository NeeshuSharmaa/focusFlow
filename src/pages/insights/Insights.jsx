import { DoughnutChart } from "./components/DoughnutChart";
import StackedBarChart from "./components/StackedBarChart";
import "./Insights.css";
export default function Insights() {
  return (
    <div className="insights">
      <div className="charts">
        <StackedBarChart />

        <DoughnutChart />
      </div>
    </div>
  );
}
