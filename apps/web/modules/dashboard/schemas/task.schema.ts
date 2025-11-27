import { z } from "zod";
import { TASK_VALIDATION } from "../constants/dashboard.constants";

export const taskSchema = z.object({
  title: z.string().min(TASK_VALIDATION.TASK_TITLE_MIN_LENGTH, {
    message: `Task title must be at least ${TASK_VALIDATION.TASK_TITLE_MIN_LENGTH} characters.`,
  }),
  
  description: z.string().optional(),

  priority: z
    .enum(["low", "medium", "high"])
    .optional()
    .refine((val) => !!val, {
      message: "Please select a priority level.",
    }),

  assignedTo: z
    .string()
    .min(1, "Please select a team member."),

  status: z
    .enum(["todo", "in-progress", "done"])
    .optional()
    .refine((val) => !!val, {
      message: "Please select a status.",
    }),

  dueDate: z.string().min(1, "Please select a due date."),
});

export type TaskFormData = z.infer<typeof taskSchema>;
