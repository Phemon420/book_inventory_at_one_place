import { useMutation } from "@tanstack/react-query"
import { loginUser } from "./api"
import type { LoginFormValues } from "./type"
import { signupUser } from './api'
import type { SignupFormValues } from './type'

export const useLogin = (onError: (message: string) => void, onSuccess?: () => void) => {
  return useMutation({
    mutationFn: (data: LoginFormValues) => loginUser(data),
    onSuccess: (data) => {
      console.log("Login successful:", data)
      onSuccess?.()
    },
    onError: (error:any) => {
      if (error.response) {
        const { data } = error.response
        onError(data?.error || "An error occurred during login")
      } else if (error.request) {
        onError("No response from server. Please check your connection.")
      } else {
        onError(error.message || "An unexpected error occurred")
      }
    },
  })
}


export const useSignup = (onError: (message: string) => void, onSuccess?: () => void) => {
  return useMutation({
    mutationFn: (data: SignupFormValues) => signupUser(data),
    onSuccess: (data) => {
      console.log('Signup successful:', data)
      onSuccess?.()
    },
    onError: (error: any) => {
      if (error.response) {
        const { data } = error.response
        onError(data?.error || 'An error occurred during signup')
      } else if (error.request) {
        onError('No response from server. Please check your connection.')
      } else {
        onError(error.message || 'An unexpected error occurred')
      }
    },
  })
}
