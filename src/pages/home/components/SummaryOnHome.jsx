import { getTimeHHMMSS, getTimeMMSS } from "../../../features/TimeUtils";

export default function SummaryOnHome({ tasks }) {
  const uncompletedTasks = tasks?.filter(({ completed }) => !completed);
  const completedTasks = tasks?.filter(({ completed }) => completed);
  const elapsedTime = tasks?.reduce(
    (totalTime, task) =>
      totalTime +
      (task.timeSpent.reduce((acc, curr) => acc + curr.elapsedTime, 0) || 0),
    0
  );
  const getTime = (time) => {
    if (time < 60) {
      return time;
    } else if (time > 60 && time < 3600) {
      return getTimeMMSS(time);
    } else {
      return getTimeHHMMSS(time);
    }
  };
  const timeUnit = (time) => {
    if (time < 60) {
      return "s";
    } else if (time > 60 && time < 3600) {
      return "m";
    } else {
      return "h";
    }
  };
  return (
    <section className="summary">
      <div className="summary-child">
        <h1>{uncompletedTasks?.length}</h1>

        <small>Tasks to be Completed</small>
      </div>
      <div className="summary-child">
        <div className="summary-child-main">
          <h1>{getTime(elapsedTime)}</h1>
          <small>{timeUnit(elapsedTime)}</small>
        </div>
        <small>Elapsed Time</small>
      </div>
      <div className="summary-child">
        <h1>{completedTasks?.length}</h1>
        <small>Completed Tasks</small>
      </div>
    </section>
  );
}
