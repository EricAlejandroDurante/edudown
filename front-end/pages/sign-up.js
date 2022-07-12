/*import { useState } from 'react'
import Link from 'next/link'
import { publicInstance } from 'axios-instance'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import MainLayout from 'layouts/main'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const FormSchema = Yup.object().shape({
  email: Yup.string().required('').email(''),
  password: Yup.string().required(''),
  password_confirmation: Yup.string().required('')
})

export default function SignUp () {
  const router = useRouter()
  const [signUpError, setSignUpError] = useState(false)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      password_confirmation: ''
    },
    validationSchema: FormSchema,
    onSubmit: async (values) => {
      publicInstance.post('sign_up', values)
        .then(async (response) => {
          const login = await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false
          })
          if (login.ok) {
            router.push('/')
          } else {
            setSignUpError(true)
          }
        }).catch(() => {
          setSignUpError(true)
        })
    }
  })
  return (
    <MainLayout>
      <div className='flex flex-grow h-full w-full justify-center items-center'>
        <div className="w-full max-w-md overflow-hidden rounded-lg shadow-md bg-white dark:bg-gray-800">
          <div className="px-6 py-4">
            <h2 className="text-3xl font-bold text-center text-gray-700 dark:text-white">Panol</h2>
            <h3 className="mt-1 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Bienvenido/a</h3>
            <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Crea una cuenta</p>
            {signUpError && <p className="mt-1 text-center text-red-500 dark:text-red-200">No pudimos crear tu cuenta</p>}
            <form onSubmit={formik.handleSubmit}>
              <div className="w-full mt-4">
                <input type="email" name='email' placeholder="Correo electrónico" aria-label="Email Address" onChange={formik.handleChange} value={formik.values.email} required />
              </div>
              <div className="w-full mt-4">
                <input type="password" placeholder="Contraseña" aria-label="Password" name='password' onChange={formik.handleChange} value={formik.values.password} required />
              </div>
              <div className="w-full mt-4">
                <input type="password" placeholder="Confirmar Contraseña" aria-label="Confirm Password" name='password_confirmation' onChange={formik.handleChange} value={formik.values.password_confirmation} required/>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className='invisible'>
                  <a href="#" className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500">Forget Password?</a>
                </div>
                <button className="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none" type='submit'>Registrarse</button>
              </div>
            </form>
          </div>
          <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
            <span className="text-sm text-gray-600 dark:text-gray-200">¿Tienes una cuenta? </span>
            <Link href='/sign-up'><span className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline hover:cursor-pointer">Entrar</span></Link>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
*/