
export const VALIDATION = {
  USERNAME_MIN_LENGTH: 2,
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_REGISTER_MIN_LENGTH: 8,
  TASK_TITLE_MIN_LENGTH: 3,
  TASK_DESCRIPTION_MIN_LENGTH: 10,
} as const;

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
} as const;

export const DEMO_ACCOUNTS = {
  ADMIN: {
    email: "admin@example.com",
    password: "admin123",
  },
  USER: {
    email: "user@example.com",
    password: "user123",
  },
} as const;

export const TASK_STATUS_ORDER = {
  "in-progress": 0,
  todo: 1,
  done: 2,
} as const;

export const PRIORITY_COLORS = {
  high: "bg-red-100 text-red-700",
  medium: "bg-yellow-100 text-yellow-700",
  low: "bg-green-100 text-green-700",
} as const;

export const STATUS_LABELS = {
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Done",
} as const;

