import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { mockRegister } from "@/lib/mocks/auth";
import { ROUTES } from "@/lib/constants";
import { RegisterFormData } from "../schemas/register.schema";

export function useRegister() {
  const { login } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (values: RegisterFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await mockRegister(
        values.username,
        values.email,
        values.password
      );

      if (result.success && result.user) {
        login(result.user);
        toast.success("Account created successfully", {
          description: `Welcome ${result.user.username}`,
        });
        router.push(ROUTES.DASHBOARD);
      } else {
        setError(result.error || "Registration failed");
        toast.error("Registration failed", {
          description: result.error || "Registration failed",
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
    handleRegister,
    isLoading,
    error,
  };
}
