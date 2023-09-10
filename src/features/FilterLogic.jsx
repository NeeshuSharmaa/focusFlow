export const filteredTasks = (tasks, filters) => {
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
  const filterFuncs = [filterByStatus, filterByPriority];
  const giveFilteredTasks = filterFuncs.reduce(
    (tasksArr, currFunc) => currFunc(tasksArr),
    tasks
  );

  return giveFilteredTasks;
};
