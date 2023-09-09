export const filteredTasks = (tasks, filters) => {
  console.log(filters);
  const filterByDate = (tasks) =>
    filters.date
      ? tasks?.filter(({ dueDate }) => dueDate === filters.date)
      : tasks;

  const filterByStatus = (tasks) => {
    if (filters.status) {
      if (filters.status === "completed") {
        return tasks?.filter(({ completed }) => completed);
      } else if (filters.status === "pending") {
        return tasks?.filter(({ completed }) => !completed);
      } else {
        return tasks;
      }
    } else {
      return tasks;
    }
  };

  const filterByPriority = (tasks) =>
    filters.priority
      ? tasks?.filter(({ priority }) => priority === filters.priority)
      : tasks;
  const filterFuncs = [filterByDate, filterByStatus, filterByPriority];
  const giveFilteredTasks = filterFuncs.reduce(
    (tasksArr, currFunc) => currFunc(tasksArr),
    tasks
  );
  console.log("filterbydate", filterByDate(tasks));
  console.log("filterbystatus", filterByStatus(tasks));
  console.log("filterbyprio", filterByPriority(tasks));
  console.log(giveFilteredTasks);

  return giveFilteredTasks;
};
