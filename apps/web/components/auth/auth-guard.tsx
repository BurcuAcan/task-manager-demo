"use client";

import { useRequireAuth } from "@/hooks/use-require-auth";
import { ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  requireAuth?: boolean;
  redirectIfAuthenticated?: boolean;
}

/**
 * Component wrapper for auth protection
 * Usage: 
 * <AuthGuard requireAuth>{children}</AuthGuard>
 * <AuthGuard redirectIfAuthenticated>{children}</AuthGuard>
 */
export function AuthGuard({ 
  children, 
  fallback,
  requireAuth = true,
  redirectIfAuthenticated = false,
}: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useRequireAuth({ 
    redirectIfAuthenticated 
  });

  // Show loading/fallback state
  if (isLoading) {
    return fallback ?? (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // For protected content
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  // For guest-only content (login/register)
  if (redirectIfAuthenticated && isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
