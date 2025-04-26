import type { z } from "zod"
import type { loginSchema } from "./schema"
import type { signupSchema } from './schema'

export type LoginFormValues = z.infer<typeof loginSchema>

export interface LoginResponse {
  success: boolean
  message: string
  token?: string
  user?: {
    id: string
    email: string
    name?: string
  }
}

export type SignupFormValues = z.infer<typeof signupSchema>

export interface SignupResponse {
  success: boolean
  message: string
  user?: {
    id: string
    name: string
    email: string
  }
}
