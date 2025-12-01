import { RegisterContainer } from "@/modules/(auth)/register/containers/register-container";
import { AuthGuard } from "@/components/auth";

export default function RegisterPage() {
  return (
    <AuthGuard requireAuth={false} redirectIfAuthenticated>
      <RegisterContainer />
    </AuthGuard>
  );
}

