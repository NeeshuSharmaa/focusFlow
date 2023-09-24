import { useSelector } from "react-redux";
import { DoughnutChart } from "./components/DoughnutChart";
import {
  generateBgColorsArr,
  generateDateArray,
} from "./components/ChartHelper";
import StackedBarChart from "./components/StackedBarChart";
import Table from "./components/Table";
import "./Insights.css";
import { useEffect } from "react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
export default function Insights() {
  const tasks = useSelector((state) => state.tasks.allTasks);

  const dates = generateDateArray();

  const chartTasksLength = tasks.reduce(
    (acc, task) =>
      task.timeSpent.some(({ date }) => dates.some((DATE) => DATE === date))
        ? (acc += 1)
        : acc,
    0
  );
  const colors = generateBgColorsArr(chartTasksLength);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, []);
  return (
    <div className="insights">
      <Tabs variant="enclosed">
        <TabList>
          <Tab _hover={{ bg: "white" }} _selected={{ color: "#35afd8" }}>
            Stacked Bar Chart
          </Tab>
          <Tab _hover={{ bg: "white" }} _selected={{ color: "#35afd8" }}>
            Doughnut Chart
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <StackedBarChart colors={colors} dates={dates} />
          </TabPanel>
          <TabPanel>
            <DoughnutChart colors={colors} dates={dates} />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <section>
        <Table />
      </section>
    </div>
  );
}
