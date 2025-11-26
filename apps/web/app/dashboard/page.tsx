"use client";

import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateTaskForm } from "@/components/create-task-form";
import { ProfileCard, StatisticsCard, TaskColumn } from "@/components/dashboard";
import { useTasks } from "@/hooks/use-tasks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ROUTES } from "@/lib/constants";

export default function DashboardPage() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const { addTask, getTasksByStatus, statistics } = useTasks();

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

        <div className="grid gap-4 md:grid-cols-2">
          <ProfileCard user={user} />
          <StatisticsCard
            total={statistics.total}
            inProgress={statistics.inProgress}
            completed={statistics.completed}
          />
        </div>

        <CreateTaskForm onTaskCreated={handleTaskCreated} />

        <Card>
          <CardHeader>
            <CardTitle>Task Board</CardTitle>
            <CardDescription>
              Organize your tasks by status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <TaskColumn status="todo" tasks={getTasksByStatus("todo")} />
              <TaskColumn
                status="in-progress"
                tasks={getTasksByStatus("in-progress")}
              />
              <TaskColumn status="done" tasks={getTasksByStatus("done")} />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
