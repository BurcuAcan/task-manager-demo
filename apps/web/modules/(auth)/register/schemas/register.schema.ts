import { z } from "zod";
import { AUTH_VALIDATION } from "@/modules/(auth)/constants/auth.constants";

export const registerSchema = z.object({
  username: z.string().min(AUTH_VALIDATION.USERNAME_MIN_LENGTH, {
    message: `Username must be at least ${AUTH_VALIDATION.USERNAME_MIN_LENGTH} characters.`,
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(AUTH_VALIDATION.PASSWORD_REGISTER_MIN_LENGTH, {
    message: `Password must be at least ${AUTH_VALIDATION.PASSWORD_REGISTER_MIN_LENGTH} characters.`,
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type RegisterFormData = z.infer<typeof registerSchema>;
