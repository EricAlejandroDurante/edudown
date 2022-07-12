import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import MainLayout from 'layouts/main'
import { useRouter } from 'next/router'
import Login from 'components/login'
import Administrador from 'layouts/administrador/index'


export default function Home() {
  const router = useRouter()
  const { data: session } = useSession()
  return (
    <MainLayout>
      <div className='flex flex-col justify-center items-center'>
        {session && <Administrador/>}
        {!session && <Login/>}
      </div>
    </MainLayout>
  )
}
