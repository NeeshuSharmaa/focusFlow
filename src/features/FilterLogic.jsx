export const filteredTasks = (tasks, filters, location) => {
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

  const filterByPriority = (tasks) => {
    const selectedPriority = Object.keys(filters.priority).filter(
      (p) => filters.priority[p]
    );

    return selectedPriority.length
      ? tasks?.filter(({ priority }) => selectedPriority.includes(priority))
      : tasks;
  };

  const sort = (tasks) => {
    const priority = { high: 1, medium: 2, low: 3, none: 4 };
    const totalTimeSpent = (timeArr) =>
      timeArr.reduce((acc, curr) => acc + curr.elapsedTime, 0);

    if (filters.sort === "phl")
      return [...tasks].sort(
        ({ priority: A }, { priority: B }) => priority[A] - priority[B]
      );
    else if (filters.sort === "plh")
      return [...tasks].sort(
        ({ priority: A }, { priority: B }) => priority[B] - priority[A]
      );
    else if (filters.sort === "thl")
      return [...tasks].sort(
        ({ timeSpent: A }, { timeSpent: B }) =>
          totalTimeSpent(B) - totalTimeSpent(A)
      );
    else if (filters.sort === "tlh")
      return [...tasks].sort(
        ({ timeSpent: A }, { timeSpent: B }) =>
          totalTimeSpent(A) - totalTimeSpent(B)
      );
    else return tasks;
  };

  const filterFuncs =
    location === "/"
      ? [filterBySearch, filterByPriority, sort]
      : [filterBySearch, filterByStatus, filterByPriority, sort];

  const giveFilteredTasks = filterFuncs.reduce(
    (tasksArr, currFunc) => currFunc(tasksArr),
    tasks
  );

  return giveFilteredTasks;
};
