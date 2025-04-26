import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }).min(1, { message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" }).min(8, { message: "Password must be at least 8 characters" }),
});

export const signupSchema = z.object({
    name: z.string().min(3, 'Username must be at least 3 characters long').max(20, 'Username must be less than 20 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
  });