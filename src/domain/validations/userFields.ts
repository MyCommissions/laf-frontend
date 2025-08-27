// domain/validation/userFields.ts
import { z } from "zod";

export const emailField = z
  .string()
  .min(1, "Email is required")
  .email("Invalid email format")
  .transform((val) => val.trim().toLowerCase());

export const passwordField = z
  .string()

export const rememberMeField = z.boolean().optional().default(false);
