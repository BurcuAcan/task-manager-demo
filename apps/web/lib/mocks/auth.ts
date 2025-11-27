import { User, AuthResponse } from "@/modules/(auth)/types/auth.types";

const USERS_STORAGE_KEY = "all_users";

const initialMockUsers = [
  {
    id: 1,
    username: "admin",
    email: "admin@example.com",
    password: "admin123",
  },
  {
    id: 2,
    username: "user",
    email: "user@example.com",
    password: "user123",
  },
  {
    id: 3,
    username: "johndoe",
    email: "john@example.com",
    password: "password123",
  },
];

if (typeof window !== "undefined") {
  const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
  if (!storedUsers) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initialMockUsers));
  }
}

export const getAllUsers = (): Array<{ id: number; username: string; email: string; password: string }> => {
  if (typeof window === "undefined") return initialMockUsers;
  
  const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
  return storedUsers ? JSON.parse(storedUsers) : initialMockUsers;
};

export const getAllTeamMembers = (): Array<{ id: number; username: string; email: string }> => {
  const users = getAllUsers();
  return users.map(({ password, ...user }) => user);
};

const saveUsers = (users: Array<{ id: number; username: string; email: string; password: string }>) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }
};

export const mockLogin = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const users = getAllUsers();
  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    return { success: true, user: userWithoutPassword };
  }

  return { success: false, error: "Invalid email or password" };
};

export const mockRegister = async (
  username: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const users = getAllUsers();
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return { success: false, error: "Email already exists" };
  }

  const newUser = {
    id: users.length + 1,
    username,
    email,
    password,
  };

  users.push(newUser);
  saveUsers(users);

  const { password: _, ...userWithoutPassword } = newUser;
  return { success: true, user: userWithoutPassword };
};

