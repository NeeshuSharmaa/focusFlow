export const tasks = [
  {
    id: Date.now(),
    name: "Fix Code Bug",
    priority: "high",
    dueDate: "15-10-2023",
    timeSpent: [
      { date: "2023-09-24", elapsedTime: 2000 },
      { date: "2023-09-22", elapsedTime: 5900 },
    ],
    completed: false,
  },
  {
    id: Date.now() + 1,
    name: "Build pagination feature",
    priority: "medium",
    dueDate: "20-10-2023",
    timeSpent: [
      { date: "2023-09-24", elapsedTime: 1200 },
      { date: "2023-09-26", elapsedTime: 4250 },
    ],
    completed: false,
  },
  {
    id: Date.now() + 3,
    name: "Decode the Cat Puzzle",
    priority: "low",
    dueDate: "25-10-2023",
    timeSpent: [{ date: "2023-09-20", elapsedTime: 2000 }],
    completed: true,
  },
  {
    id: Date.now() + 4,
    name: "Office Stationery Dragon",
    priority: "none",
    dueDate: "30-10-2023",
    timeSpent: [],
    completed: false,
  },
  {
    id: Date.now() + 5,
    name: "Create a stellar Potfolio",
    priority: "high",
    dueDate: "05-11-2023",
    timeSpent: [
      { date: "2023-09-20", elapsedTime: 6500 },
      { date: "2023-09-24", elapsedTime: 3000 },
    ],
    completed: true,
  },
];
