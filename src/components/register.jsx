'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const RegisterForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !email || !password) {
      setError('All fields are required')
      return
    }
    try {
      const resUser = await fetch('/api/userExists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const { user } = await resUser.json()

      if (user) {
        setError('User Already Exists')
        return
      }

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })

      if (res.ok) {
        const form = e.target
        form.reset()
        router.push('/')
      } else {
        console.log('User registration failed')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="grid place-items-center h-screen">
      <div className="p-5 shadow-lg rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
          />
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
            Register
          </button>
          {error && (
            <div className="bg-red-600 text-white w-fit px-4 py-1 rounded-lg mt-2 text-sm">
              {error}
            </div>
          )}

          <Link href={'/'} className="text-sm text-center mt-5">
            Already have an account? {''}
            <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  )
}
export default RegisterForm
