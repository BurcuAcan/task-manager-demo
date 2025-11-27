export { DashboardContainer } from "./containers/dashboard-container";

export { ProfileCard } from "./components/profile-card";
export { StatisticsCard } from "./components/statistics-card";
export { TaskCard } from "./components/task-card";
export { TaskColumn } from "./components/task-column";
export { CreateTaskForm } from "./components/create-task-form";

export { useDashboardTasks } from "./hooks/use-dashboard-tasks";

export { taskSchema, type TaskFormData } from "./schemas/task.schema";

export type { Task, TaskStatus, TaskPriority } from "./types/task.types";

export { DEFAULT_TASKS } from "./mocks/tasks.mock";

export { 
  TASK_STATUS_ORDER, 
  PRIORITY_COLORS, 
  STATUS_LABELS,
  TASK_VALIDATION 
} from "./constants/dashboard.constants";

