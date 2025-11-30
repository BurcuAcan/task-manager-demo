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
 * @param options.redirectTo - Where to redirect if not authenticated (default: /login)
 * @param options.redirectIfAuthenticated - If true, redirects authenticated users (for login/register pages)
 */
export function useRequireAuth(options: UseRequireAuthOptions = {}) {
  const { 
    redirectTo = ROUTES.LOGIN, 
    redirectIfAuthenticated = false 
  } = options;
  
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Don't redirect while still loading
    if (isLoading) return;

    if (redirectIfAuthenticated && isAuthenticated) {
      // User is authenticated but shouldn't be on this page (login/register)
      router.push(ROUTES.DASHBOARD);
    } else if (!redirectIfAuthenticated && !isAuthenticated) {
      // User is not authenticated but needs to be
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, redirectIfAuthenticated, redirectTo, router]);

  return {
    user,
    isAuthenticated,
    isLoading,
  };
}
