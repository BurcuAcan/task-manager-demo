"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { mockLogin } from "@/lib/mocks/auth";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { VALIDATION, ROUTES } from "@/lib/constants";

const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(VALIDATION.PASSWORD_MIN_LENGTH, {
    message: `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters.`,
  }),
});

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    setError(null);

    try {
      const result = await mockLogin(values.email, values.password);

      if (result.success && result.user) {
        login(result.user);
        toast.success("Welcome back!", {
          description: `Logged in as ${result.user.username}`,
        });
        router.push(ROUTES.DASHBOARD);
      } else {
        setError(result.error || "Login failed");
        toast.error("Login failed", {
          description: result.error || "Login failed",
        });
      }
    } catch (err) {
      setError("An unexpected error occurred");
      toast.error("An unexpected error occurred", {
        description: "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  }

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="m@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-muted-foreground text-center">
            <p className="mb-2">Demo accounts:</p>
            <div className="space-y-1">
              <p className="font-mono text-xs">admin@example.com / admin123</p>
              <p className="font-mono text-xs">user@example.com / user123</p>
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

