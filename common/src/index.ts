import { z } from "zod";

export const signupSchema = z.object({
  email: z
    .email("Invalid email format")
    .min(5, "Email is too short")
    .max(255, "Email is too long"),

  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password must be at most 72 characters")
    .regex(
      /[A-Z]/,
      "Password must contain at least one uppercase letter"
    )
    .regex(
      /[a-z]/,
      "Password must contain at least one lowercase letter"
    )
    .regex(
      /[0-9]/,
      "Password must contain at least one number"
    )
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
});

export const signinSchema = z.object({
  email: z
    .email("Invalid email format")
    .min(5, "Email is too short")
    .max(255, "Email is too long"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password is too long"),
});

export type SignupType = z.infer<typeof signupSchema>;
export type SigninType = z.infer<typeof signinSchema>; 