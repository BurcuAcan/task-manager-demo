import { Task } from "../types/task.types";
import { PRIORITY_COLORS } from "../constants/dashboard.constants";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const getPriorityBadge = (priority: string) => {
    return (
      <span
        className={`text-xs px-2 py-0.5 rounded-full ${
          PRIORITY_COLORS[priority as keyof typeof PRIORITY_COLORS]
        }`}
      >
        {priority}
      </span>
    );
  };

  return (
    <div className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
      <div className="space-y-2">
        <p
          className={`text-sm font-medium ${
            task.status === "done" ? "line-through text-muted-foreground" : ""
          }`}
        >
          {task.title}
        </p>
        {task.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {task.description}
          </p>
        )}
        <div className="flex items-center gap-2">
          {getPriorityBadge(task.priority)}
          <span className="text-xs text-muted-foreground">{task.time}</span>
        </div>
      </div>
    </div>
  );
}

