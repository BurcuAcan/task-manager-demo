import { Lock, Palette, FormInput, Package } from "lucide-react";

export const FEATURES = [
  {
    icon: Lock,
    title: "Authentication",
    description: "Secure login and registration system",
    iconColor: "text-blue-600",
    features: [
      "Mock authentication with local storage",
      "Protected routes",
      "User session management",
    ],
  },
  {
    icon: Palette,
    title: "Modern UI",
    description: "Beautiful components from Shadcn UI",
    iconColor: "text-purple-600",
    features: [
      "Tailwind CSS v4",
      "Radix UI primitives",
      "Responsive design",
    ],
  },
  {
    icon: FormInput,
    title: "Form Validation",
    description: "Type-safe forms with Zod",
    iconColor: "text-orange-600",
    features: [
      "React Hook Form integration",
      "Real-time validation",
      "Error handling",
    ],
  },
  {
    icon: Package,
    title: "Monorepo",
    description: "Turborepo architecture",
    iconColor: "text-cyan-600",
    features: [
      "Shared UI packages",
      "TypeScript configuration",
      "Efficient builds",
    ],
  },
] as const;
