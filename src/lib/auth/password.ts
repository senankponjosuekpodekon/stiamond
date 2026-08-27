import { z } from "zod";

export const passwordPolicyMessage =
  "Password must be at least 12 characters and include one uppercase letter, one lowercase letter, one number, and one special character.";

export const registerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(12, "Password must be at least 12 characters")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[a-z]/, "Password must contain a lowercase letter")
    .regex(/[0-9]/, "Password must contain a number")
    .regex(/[^A-Za-z0-9]/, "Password must contain a special character"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
