import { z } from "zod";

const WEAK_PASSWORD_KEYWORDS = [
  "password",
  "admin",
  "qwerty",
  "123456",
  "letmein",
  "welcome",
];

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Password must contain at least one special character"
  )
  .regex(/^\S+$/, "Password must not contain spaces")
  .refine(
    (password) =>
      !WEAK_PASSWORD_KEYWORDS.some((keyword) =>
        password.toLowerCase().includes(keyword)
      ),
    {
      message: "Password contains common or weak patterns",
    }
  );

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .regex(/^\S+$/, "Email must not contain spaces")
    .refine(
      (email) =>
        !/(tempmail|mailinator|10minutemail|guerrillamail)/i.test(email),
      {
        message: "Disposable email addresses are not allowed",
      }
    ),
  password: passwordSchema
});

export type LoginSchema = z.infer<typeof loginSchema>;