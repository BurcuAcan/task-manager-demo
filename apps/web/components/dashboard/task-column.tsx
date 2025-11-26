import { Task, TaskStatus } from "@/types";
import { TaskCard } from "./task-card";
import { STATUS_LABELS } from "@/lib/constants";
import { ListTodo, Zap, Check } from "lucide-react";

interface TaskColumnProps {
  status: TaskStatus;
  tasks: Task[];
}

export function TaskColumn({ status, tasks }: TaskColumnProps) {
  const getStatusIcon = () => {
    switch (status) {
      case "done":
        return <Check className="h-4 w-4 text-green-500" />;
      case "in-progress":
        return <Zap className="h-4 w-4 text-blue-500 animate-pulse" />;
      default:
        return <ListTodo className="h-4 w-4 text-gray-400" />;
    }
  };

  const getBorderClass = () => {
    switch (status) {
      case "in-progress":
        return "border-blue-200";
      case "done":
        return "border-green-200";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        {getStatusIcon()}
        <h3 className="font-semibold text-sm">
          {STATUS_LABELS[status]}
        </h3>
        <span className="text-xs text-muted-foreground">({tasks.length})</span>
      </div>
      <div className="space-y-2">
        {tasks.map((task, index) => (
          <div key={index} className={getBorderClass()}>
            <TaskCard task={task} />
          </div>
        ))}
        {tasks.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-4">
            No tasks
          </p>
        )}
      </div>
    </div>
  );
}

