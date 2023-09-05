'use client'

import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (res.error) {
        setError('Invalid Credentials')
        return
      }

      router.replace('dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="grid place-items-center h-screen">
      <div className="p-5 shadow-lg rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <button className="font-bold bg-green-600 text-white px-6 py-2 ">
            Login
          </button>

          {error && (
            <div className="bg-red-600 text-white w-fit px-4 py-1 rounded-lg mt-2 text-sm">
              {error}
            </div>
          )}

          <Link href={'/register'} className="text-sm text-center mt-5">
            Don't have an account? {''}
            <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  )
}
export default LoginForm
