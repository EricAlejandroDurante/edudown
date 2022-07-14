import { gql, useMutation } from '@apollo/client'
import { useFormik } from 'formik'// QUE ES PARA LOS FORMULARIOS
import { useRouter } from 'next/router'
import { useState } from 'react'
import * as Yup from 'yup'
import Navbar from './navbar'
const FormSchema = Yup.object().shape({
  name: Yup.string().required(''),
  lastName: Yup.string().required(''),
  email: Yup.string().required('').email(''),
  RUT: Yup.string().required(''),
  password: Yup.string().required(''),
  especialidad: Yup.string().required(''),
  edad: Yup.number().required('')
})

const CreateUser = gql`
mutation CreateUser($RUT: String, $name: String, $lastName: String, $email: String, $password: String, $especialidad: String, $edad: Int) {
  createUser(RUT: $RUT, name: $name, lastName: $lastName, email: $email, password: $password, especialidad: $especialidad, edad: $edad) {
    RUT
    name
    lastName
    email
    password
    especialidad
    edad
    token
  }
}
`

export default function Create() {
  const router = useRouter()
  const [createError, setCreateError] = useState(false)
  const [UserCreate, { loading, error }] = useMutation(CreateUser, {
    refetchQueries: ['Users'],
    onCompleted: (data) => {
      console.log(data)
      alert("agregado satisfactoriamente")
      router.push('/')
    }
  })
  const formik = useFormik({
    initialValues: {
      RUT: '',
      name: '',
      lastName: '',
      email: '',
      password: '',
      especialidad: '',
      edad: ''
    },
    validationSchema: FormSchema,
    onSubmit: async (values) => {
      console.log("llega a submit")
      console.log(values)
      await UserCreate({ variables: values })
    }
  })
  if (loading) {
    return <div><Navbar/></div>
  }
  if (error) {
    //setCreateError(true)
    return <p>Errorxd</p>
  }
  return (
    <div className='w-full max-w-xl'>
      
      <form className='bg-white w-full max-w-lg shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={formik.handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Nombre
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" name="name" placeholder="Nombre" onChange={formik.handleChange} value={formik.values.name} required />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
              Apellido
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" name="lastName" placeholder="Apellido" onChange={formik.handleChange} value={formik.values.lastName} required />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-2">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
              Rut/Run
            </label>
            <input className="appearance block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" name="RUT" placeholder="11111111-1" onChange={formik.handleChange} value={formik.values.RUT} required />
          </div>


          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
              Especialidad
            </label>
            <select className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500' type="text" name="especialidad" placeholder="Especialidad" onChange={formik.handleChange} value={formik.values.especialidad} required >
              <option>Fonoaudiologo</option>
              <option>Kinesiologo</option>
              <option>Administrador</option>
            </select>
          </div>

          <div className='flex flex-wrap px-3 md:2-1/2'>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Email</label>
          <input className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' type="email" name="email" placeholder="email" onChange={formik.handleChange} value={formik.values.email} required />
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Contraseña</label>
          <input className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' type="password" name="password" placeholder="password" onChange={formik.handleChange} value={formik.values.password} required />
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Edad</label>
          <input className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' type="number" name="edad" placeholder="edad" onChange={formik.handleChange} value={formik.values.edad} required />

          </div>

          
        </div>
        <div className="flex items-center justify-between mt-4">
          <button className='shadow bg-french-raspberry hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded' type='submit'>Crear Usuario</button>
        </div>
      </form >
    </div >
  )
}