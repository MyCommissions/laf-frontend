// domain/validation/loginSchema.ts
import { z } from "zod";
import { emailField, passwordField, rememberMeField } from "./userFields";

export const loginSchema = z.object({
  email: emailField,
  password: passwordField,
  rememberMe: rememberMeField,
});

export const registerSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  email: emailField,
  password: passwordField,
});