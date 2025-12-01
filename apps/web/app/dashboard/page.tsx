import { DashboardContainer } from "@/modules/dashboard/containers/dashboard-container";
import { AuthGuard } from "@/components/auth";

export default function DashboardPage() {
  return (
    <AuthGuard requireAuth>
      <DashboardContainer />
    </AuthGuard>
  );
}
