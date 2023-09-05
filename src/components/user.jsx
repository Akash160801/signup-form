'use client'

import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

const User = () => {
  const { data: session } = useSession()
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6">
        <h3>
          Name: <span className="font-bold">{session?.user?.name}</span>
        </h3>
        <h3>
          Email: <span className="font-bold">{session?.user?.email}</span>
        </h3>

        <button
          onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })}
          className="bg-red-500 text-white font-bold px-6 py-2 mt-3 rounded-lg"
        >
          Log Out
        </button>
      </div>
    </div>
  )
}
export default User
