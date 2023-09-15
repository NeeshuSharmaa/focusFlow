export const filteredTasks = (tasks, filters) => {
  const filterBySearch = (tasks) => {
    const noWhiteSpace = (string) =>
      [...string].reduce((acc, curr) => (curr === " " ? acc : acc + curr), "");
    return filters.search
      ? tasks.filter(
          ({ name, dueDate }) =>
            noWhiteSpace(name.toLowerCase()).includes(
              noWhiteSpace(filters.search.toLowerCase())
            ) || dueDate.includes(filters.search)
        )
      : tasks;
  };

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

  const filterFuncs = [filterBySearch, filterByStatus, filterByPriority];

  const giveFilteredTasks = filterFuncs.reduce(
    (tasksArr, currFunc) => currFunc(tasksArr),
    tasks
  );

  return giveFilteredTasks;
};
