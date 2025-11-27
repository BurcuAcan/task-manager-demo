import { z } from "zod";
import { AUTH_VALIDATION } from "../../constants/auth.constants";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(AUTH_VALIDATION.PASSWORD_MIN_LENGTH, {
    message: `Password must be at least ${AUTH_VALIDATION.PASSWORD_MIN_LENGTH} characters.`,
  }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
