import { LoginContainer } from "@/modules/(auth)/login/containers/login-container";
import { AuthGuard } from "@/components/auth";

export default function LoginPage() {
  return (
    <AuthGuard requireAuth={false} redirectIfAuthenticated>
      <LoginContainer />
    </AuthGuard>
  );
}

