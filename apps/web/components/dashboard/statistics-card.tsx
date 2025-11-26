import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface StatisticsCardProps {
  total: number;
  inProgress: number;
  completed: number;
}

export function StatisticsCard({ total, inProgress, completed }: StatisticsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistics</CardTitle>
        <CardDescription>Your activity overview</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm">Total Tasks</span>
          <span className="text-sm font-bold">{total}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">In Progress</span>
          <span className="text-sm font-bold">{inProgress}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Completed</span>
          <span className="text-sm font-bold">{completed}</span>
        </div>
      </CardContent>
    </Card>
  );
}

