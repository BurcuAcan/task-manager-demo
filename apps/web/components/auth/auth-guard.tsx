"use client";

import { useRequireAuth } from "@/hooks/use-require-auth";
import { ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  requireAuth?: boolean;
  redirectIfAuthenticated?: boolean;
}

export function AuthGuard({ 
  children, 
  fallback,
  requireAuth = true,
  redirectIfAuthenticated = false,
}: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useRequireAuth({ 
    redirectIfAuthenticated 
  });

  if (isLoading) {
    return fallback ?? (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return null;
  }
  if (redirectIfAuthenticated && isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
