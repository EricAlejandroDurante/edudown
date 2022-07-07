import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import MainLayout from 'layouts/main'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const { data: session } = useSession()
  return (
    <MainLayout>
      <div className='flex flex-col justify-center items-center'>
        {session && <p>Logueado</p>}
        {!session && <p>No logueado</p>}
        {session && <button onClick={() => {
          signOut({ redirect: false })
          router.push('/sign-in')
        }}>Cerrar sesión</button>}
      </div>
    </MainLayout>
  )
}
