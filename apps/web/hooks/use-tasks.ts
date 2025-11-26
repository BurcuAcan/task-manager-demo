import { useState } from "react";
import { Task, TaskStatus } from "@/types";
import { TASK_STATUS_ORDER } from "@/lib/constants";

const DEFAULT_TASKS: Task[] = [
  {
    title: "Update project documentation",
    description: "Add API documentation",
    status: "in-progress",
    priority: "high",
    assignedTo: "admin",
    dueDate: "2024-12-01",
    time: "2 hours ago",
  },
  {
    title: "Fix navigation bug",
    description: "Mobile menu not closing properly",
    status: "todo",
    priority: "medium",
    assignedTo: "john",
    dueDate: "2024-12-05",
    time: "5 hours ago",
  },
  {
    title: "Review pull requests",
    description: "Team member submissions",
    status: "todo",
    priority: "low",
    assignedTo: "jane",
    dueDate: "2024-12-10",
    time: "1 day ago",
  },
  {
    title: "Deploy to production",
    description: "Version 2.0 release",
    status: "done",
    priority: "high",
    assignedTo: "admin",
    dueDate: "2024-11-25",
    time: "2 days ago",
  },
];

export function useTasks(initialTasks: Task[] = DEFAULT_TASKS) {
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

