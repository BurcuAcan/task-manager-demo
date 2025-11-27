"use client";

import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants";

export function CTAButtons() {
  const router = useRouter();

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
