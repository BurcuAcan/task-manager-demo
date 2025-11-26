"use client";

import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ROUTES } from "@/lib/constants";
import { Lock, Palette, FormInput, Package, Check } from "lucide-react";

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-gray-50 to-purple-50 p-4">
      <div className="max-w-4xl space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Welcome to Shadcn Auth Demo
          </h1>
          <p className="text-lg text-muted-foreground">
            A modern authentication system built with Next.js, Shadcn UI, React
            Hook Form, and Zod validation.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="text-left">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-blue-600" />
                Authentication
              </CardTitle>
              <CardDescription>
                Secure login and registration system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  Mock authentication with local storage
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  Protected routes
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  User session management
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="text-left">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-purple-600" />
                Modern UI
              </CardTitle>
              <CardDescription>Beautiful components from Shadcn UI</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  Tailwind CSS v4
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  Radix UI primitives
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  Responsive design
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="text-left">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FormInput className="h-5 w-5 text-orange-600" />
                Form Validation
              </CardTitle>
              <CardDescription>Type-safe forms with Zod</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  React Hook Form integration
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  Real-time validation
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  Error handling
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="text-left">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-cyan-600" />
                Monorepo
              </CardTitle>
              <CardDescription>Turborepo architecture</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  Shared UI packages
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  TypeScript configuration
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  Efficient builds
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

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

        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium">Demo Accounts</p>
          <div className="mt-2 space-y-1 text-xs text-muted-foreground">
            <p>Admin: admin@example.com / admin123</p>
            <p>User: user@example.com / user123</p>
          </div>
        </div>
      </div>
    </main>
  );
}
