import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../utils/schema'
import type { LoginFormValues } from '../utils/type'
import { useLogin } from '../utils/mutation'
import { useState } from 'react'

function Login() {

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const loginMutation = useLogin(setErrorMessage)

  const onSubmit = (data: LoginFormValues) => {
    setErrorMessage(null)
    loginMutation.mutate(data)
  }

  return (
    <div className='flex items-center justify-center h-screen w-screen'>
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h1 className='text-3xl font-semibold mx-auto '>Welcome back!</h1>
        <input {...register('email')} type="email" placeholder="UID" className="border border-black rounded-md p-3 text-lg mt-7 min-w-[350px]"/>
        {errors.email && <div className="text-red-500">*{errors.email.message}</div>}

        <input {...register('password')} type="password" placeholder="Password" className="border border-black rounded-md p-3 text-lg  min-w-[350px]"/>
        {errors.password && <div className="text-red-500">*{errors.password.message}</div>}

        <button disabled={loginMutation.isPending} type="submit"  className="bg-blue-950 text-white py-3 px-6 rounded-md text-lg disabled:opacity-50 mt-5  min-w-[350px]">
          {loginMutation.isPending ? 'Loading...' : 'Login'}
        </button>

        {errors.root && <div className="text-red-500">*{errors.root.message}</div>}
        {errorMessage && <div className="text-red-500">*{errorMessage}</div>}
      </form>
    </div>
  )
}

export default Login