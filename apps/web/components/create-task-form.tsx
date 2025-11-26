"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { mockUsers } from "@/lib/mocks/auth";
import { Button } from "@/components/ui/button";
import { VALIDATION } from "@/lib/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AlertCircle, ListTodo, Zap, Check } from "lucide-react";

const taskSchema = z.object({
  title: z.string().min(VALIDATION.TASK_TITLE_MIN_LENGTH, {
    message: `Task title must be at least ${VALIDATION.TASK_TITLE_MIN_LENGTH} characters.`,
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


type TaskFormData = z.infer<typeof taskSchema>;

interface CreateTaskFormProps {
  onTaskCreated?: (task: TaskFormData) => void;
}

export function CreateTaskForm({ onTaskCreated }: CreateTaskFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      assignedTo: "",
      status: "todo",
      dueDate: "",
    },
  });

  async function onSubmit(data: TaskFormData) {
    setIsSubmitting(true);
    setSubmitSuccess(false);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    
    if (onTaskCreated) {
      onTaskCreated(data);
      toast.success("Task created successfully!", {
        description: `Task created for ${data.assignedTo}`,
      });
    } else {
      toast.error("Task creation failed!", {
        description: "Please try again.",
      });
    }

    setSubmitSuccess(true);
    setIsSubmitting(false);

    setTimeout(() => {
      form.reset();
      setSubmitSuccess(false);
    }, 2000);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Task</CardTitle>
        <CardDescription>
          Fill out the form below to create a new task for your team.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {submitSuccess && (
              <div className="rounded-md bg-green-50 p-3 text-sm text-green-800 border border-green-200 flex items-center gap-2">
                <Check className="h-4 w-4" />
                Task created successfully!
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Task Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Update homepage design" {...field} />
                    </FormControl>
                    <FormDescription>
                      A clear and concise title for the task
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide detailed information about the task..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Detailed description of what needs to be done
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-green-500" />
                            Low
                          </div>
                        </SelectItem>
                        <SelectItem value="medium">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-yellow-500" />
                            Medium
                          </div>
                        </SelectItem>
                        <SelectItem value="high">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-red-500" />
                            High
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="assignedTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assigned To</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select team member" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockUsers.map((user) => (
                          <SelectItem key={user.id} value={user.username}>
                            {user.username}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="todo" id="todo" />
                          <Label htmlFor="todo" className="cursor-pointer flex items-center gap-2">
                            <ListTodo className="h-4 w-4 text-gray-400" />
                            To Do
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="in-progress" id="in-progress" />
                          <Label htmlFor="in-progress" className="cursor-pointer flex items-center gap-2">
                            <Zap className="h-4 w-4 text-blue-500" />
                            In Progress
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="done" id="done" />
                          <Label htmlFor="done" className="cursor-pointer flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            Done
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Task"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                Reset Form
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

