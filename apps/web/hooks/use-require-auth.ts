"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { ROUTES } from "@/lib/constants";

interface UseRequireAuthOptions {
  redirectTo?: string;
  redirectIfAuthenticated?: boolean;
}

/**
 * Hook to protect pages that require authentication
 * @param options.redirectTo 
 * @param options.redirectIfAuthenticated 
 */
export function useRequireAuth(options: UseRequireAuthOptions = {}) {
  const { 
    redirectTo = ROUTES.LOGIN, 
    redirectIfAuthenticated = false 
  } = options;
  
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (redirectIfAuthenticated && isAuthenticated) {
      router.push(ROUTES.DASHBOARD);
    } else if (!redirectIfAuthenticated && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, redirectIfAuthenticated, redirectTo, router]);

  return {
    user,
    isAuthenticated,
    isLoading,
  };
}
