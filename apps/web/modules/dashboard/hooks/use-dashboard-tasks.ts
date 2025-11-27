import { useState } from "react";
import { Task, TaskStatus } from "../types/task.types";
import { TASK_STATUS_ORDER } from "../constants/dashboard.constants";
import { DEFAULT_TASKS } from "../mocks/tasks.mock";

export function useDashboardTasks(initialTasks: Task[] = DEFAULT_TASKS) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (task: Omit<Task, "time">) => {
    const newTask: Task = {
      ...task,
      time: "Just now",
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter((t) => t.status === status);
  };

  const sortedTasks = [...tasks].sort(
    (a, b) => TASK_STATUS_ORDER[a.status] - TASK_STATUS_ORDER[b.status]
  );

  const statistics = {
    total: tasks.length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    completed: tasks.filter((t) => t.status === "done").length,
    todo: tasks.filter((t) => t.status === "todo").length,
  };

  return {
    tasks,
    addTask,
    getTasksByStatus,
    sortedTasks,
    statistics,
  };
}
