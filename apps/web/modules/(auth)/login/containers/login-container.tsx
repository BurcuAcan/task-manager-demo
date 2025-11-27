"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import { ROUTES } from "@/lib/constants";
import { DEMO_ACCOUNTS } from "../../constants/auth-config.constants";
import { LoginForm } from "../components/login-form";
import { useLogin } from "../hooks/use-login";

export function LoginContainer() {
  const { handleLogin, isLoading, error } = useLogin();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-[350px] sm:w-[450px]">
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-muted-foreground text-center">
            <p className="mb-2">Demo accounts:</p>
            <div className="space-y-1">
              <p className="font-mono text-xs">{DEMO_ACCOUNTS.ADMIN.email} / {DEMO_ACCOUNTS.ADMIN.password}</p>
              <p className="font-mono text-xs">{DEMO_ACCOUNTS.USER.email} / {DEMO_ACCOUNTS.USER.password}</p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground text-center">
            Don't have an account?{" "}
            <a href={ROUTES.REGISTER} className="underline underline-offset-4">
              Sign up
            </a>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
