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
import { RegisterForm } from "../components/register-form";
import { useRegister } from "../hooks/use-register";

export function RegisterContainer() {
  const { handleRegister, isLoading, error } = useRegister();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-[350px] sm:w-[450px]">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your details below to create your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm onSubmit={handleRegister} isLoading={isLoading} error={error} />
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <a href={ROUTES.LOGIN} className="underline underline-offset-4">
              Sign in
            </a>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
