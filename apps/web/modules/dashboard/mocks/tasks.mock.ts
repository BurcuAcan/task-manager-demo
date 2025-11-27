import { Task } from "../types/task.types";

export const DEFAULT_TASKS: Task[] = [
  {
    title: "Update project documentation",
    description: "Add API documentation",
    status: "in-progress" as const,
    priority: "high" as const,
    assignedTo: "admin",
    dueDate: "2024-12-01",
    time: "2 hours ago",
  },
  {
    title: "Fix navigation bug",
    description: "Mobile menu not closing properly",
    status: "todo" as const,
    priority: "medium" as const,
    assignedTo: "john",
    dueDate: "2024-12-05",
    time: "5 hours ago",
  },
  {
    title: "Review pull requests",
    description: "Team member submissions",
    status: "todo" as const,
    priority: "low" as const,
    assignedTo: "jane",
    dueDate: "2024-12-10",
    time: "1 day ago",
  },
  {
    title: "Deploy to production",
    description: "Version 2.0 release",
    status: "done" as const,
    priority: "high" as const,
    assignedTo: "admin",
    dueDate: "2024-11-25",
    time: "2 days ago",
  },
];
