"use client";

import { useRequireAuth } from "@/hooks/use-require-auth";
import { ComponentType } from "react";

interface WithAuthOptions {
  redirectTo?: string;
  redirectIfAuthenticated?: boolean;
  LoadingComponent?: ComponentType;
}

export function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>,
  options: WithAuthOptions = {}
) {
  const { LoadingComponent } = options;

  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, isLoading } = useRequireAuth(options);

    if (isLoading) {
      if (LoadingComponent) {
        return <LoadingComponent />;
      }
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      );
    }

    if (!options.redirectIfAuthenticated && !isAuthenticated) {
      return null;
    }

if (options.redirectIfAuthenticated && isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
