import { User, AuthResponse } from "@/types";

export const mockUsers = [
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

export const mockLogin = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const user = mockUsers.find(
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

  const existingUser = mockUsers.find((u) => u.email === email);
  if (existingUser) {
    return { success: false, error: "Email already exists" };
  }

  const newUser = {
    id: mockUsers.length + 1,
    username,
    email,
    password,
  };

  mockUsers.push(newUser);

  const { password: _, ...userWithoutPassword } = newUser;
  return { success: true, user: userWithoutPassword };
};

