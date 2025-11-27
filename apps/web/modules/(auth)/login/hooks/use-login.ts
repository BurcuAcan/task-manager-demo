import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { mockLogin } from "@/lib/mocks/auth";
import { ROUTES } from "@/lib/constants";
import { LoginFormData } from "../schemas/login.schema";

export function useLogin() {
  const { login } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (values: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await mockLogin(values.email, values.password);

      if (result.success && result.user) {
        login(result.user);
        toast.success("Welcome back!", {
          description: `Logged in as ${result.user.username}`,
        });
        router.push(ROUTES.DASHBOARD);
      } else {
        setError(result.error || "Login failed");
        toast.error("Login failed", {
          description: result.error || "Login failed",
        });
      }
    } catch (err) {
      setError("An unexpected error occurred");
      toast.error("An unexpected error occurred", {
        description: "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleLogin,
    isLoading,
    error,
  };
}
