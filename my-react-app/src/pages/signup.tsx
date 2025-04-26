import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signupSchema } from '../utils/schema'
import type { SignupFormValues } from '../utils/type'
import { useSignup } from '../utils/mutation'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const signupMutation = useSignup(setErrorMessage)

  const onSubmit = (data: SignupFormValues) => {
    setErrorMessage(null)
    signupMutation.mutate(data,{
      onSuccess: () => {
        // ✅ navigate to login when signup succeeds
        navigate('/login');
      }
    })
  }

  return (
    <div className='flex items-center justify-center h-screen w-screen'>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h1 className='text-3xl font-semibold mx-auto '>Create an account</h1>

        <input {...register('name')} placeholder="Username" className="border border-black rounded-md p-3 text-lg mt-7 min-w-[350px]" />
        {errors.name && <div className="text-red-500">*{errors.name.message}</div>}

        <input {...register('email')} type="email" placeholder="Email" className="border border-black rounded-md p-3 text-lg min-w-[350px]" />
        {errors.email && <div className="text-red-500">*{errors.email.message}</div>}

        <input {...register('password')} type="password" placeholder="Password" className="border border-black rounded-md p-3 text-lg min-w-[350px]" />
        {errors.password && <div className="text-red-500">*{errors.password.message}</div>}

        <button disabled={signupMutation.isPending} type="submit" className="bg-blue-950 text-white py-3 px-6 rounded-md text-lg disabled:opacity-50 mt-5 min-w-[350px]">
          {signupMutation.isPending ? 'Loading...' : 'Sign Up'}
        </button>

        {errors.root && <div className="text-red-500">{errors.root.message}</div>}
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      </form>
    </div>
  )
}

export default Signup
