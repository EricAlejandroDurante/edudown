import { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import styles from '/styles/Home.module.css'
import * as Yup from 'yup'

const FormSchema = Yup.object().shape({
  email: Yup.string().required('').email(''),
  password: Yup.string().required('')
})

export default function SignIn () {
  const router = useRouter()
  const [signInError, setSignInError] = useState(false)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: FormSchema,
    onSubmit: async (values) => {
      const login = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false
      })
      if (login.ok) {
        router.push('/')
      } else {
        setSignInError(true)
      }
    }
  })
  return (
      <div >
        <div >
          <div className="w-full max-w-xs">
            <h2 className="text-3xl font-bold text-center text-gray-700 dark:text-white">Edu Down</h2>
            {signInError && <p className="mt-1 text-center text-red-500 dark:text-red-200">Email o contraseña incorrectos</p>}
            <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={formik.handleSubmit}>
            <div className='flex flex-col justify-center items-center mb-2'>
            <h3 className="mt-1 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Bienvenido/a</h3>
                    <img src='/images/logo_edudown.png' className={styles.icon} />
                </div>
              <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                        Correo
                    </label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="email" name='email' placeholder="Correo electrónico" aria-label="Email Address" onChange={formik.handleChange} value={formik.values.email} required />
              </div>
              <div className='mb-6'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                        Contraseña
                    </label>
                <input className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' type="password" placeholder="Contraseña" aria-label="Password" name='password' onChange={formik.handleChange} value={formik.values.password} required />
              </div>
              <div className="flex items-center justify-between">
                <button className='bg-french-raspberry hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>Entrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
  )
}