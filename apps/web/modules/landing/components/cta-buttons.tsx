"use client";

import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { ROUTES } from "@/lib/constants";

export function CTAButtons() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
        <Button size="lg" onClick={() => router.push(ROUTES.DASHBOARD)}>
          Go to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
      <Button size="lg" onClick={() => router.push(ROUTES.LOGIN)}>
        Sign In
      </Button>
      <Button
        size="lg"
        variant="outline"
        onClick={() => router.push(ROUTES.REGISTER)}
      >
        Create Account
      </Button>
    </div>
  );
}
