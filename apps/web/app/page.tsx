"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { ROUTES } from "@/lib/constants";

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const redirectPath = isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LANDING;
    router.push(redirectPath);
  }, [isAuthenticated, router]);

  return null;
}

