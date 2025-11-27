"use client";

import { useAuth } from "@/contexts/auth-context";
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ROUTES } from "@/lib/constants";
import { ProfileCard } from "../components/profile-card";
import { StatisticsCard } from "../components/statistics-card";
import { TaskColumn } from "../components/task-column";
import { CreateTaskForm } from "../components/create-task-form";
import { useDashboardTasks } from "../hooks/use-dashboard-tasks";

export function DashboardContainer() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const { addTask, getTasksByStatus, statistics } = useDashboardTasks();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(ROUTES.LOGIN);
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push(ROUTES.LOGIN);
  };

  const handleTaskCreated = (task: any) => {
    addTask(task);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="mx-auto max-w-6xl space-y-6 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user.username}!
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          <aside className="space-y-6">
            <ProfileCard user={user} />
            <StatisticsCard
              total={statistics.total}
              inProgress={statistics.inProgress}
              completed={statistics.completed}
            />
          </aside>

          <div className="space-y-6">
            <CreateTaskForm onTaskCreated={handleTaskCreated} />

            <div className="grid gap-4 sm:grid-cols-3">
              <TaskColumn status="todo" tasks={getTasksByStatus("todo")} />
              <TaskColumn
                status="in-progress"
                tasks={getTasksByStatus("in-progress")}
              />
              <TaskColumn status="done" tasks={getTasksByStatus("done")} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
