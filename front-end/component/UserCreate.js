import { gql, useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const FormSchema = Yup.object().shape({
  name: Yup.string().required(''),
  email: Yup.string().required('').email(),
  RUT : Yup.string().required(''),
  password : Yup.string().required(''),
  especialidad : Yup.string().required(''),
  Date : Yup.date().required(''),
  edad : Yup.number().required('')
})

const CreateUser = gql`
mutation CreateUser($rut: String, $name: String, $email: String, $password: String, $especialidad: String, $date: String, $edad: Int) {
    createUser(RUT: $rut, name: $name, email: $email, password: $password, especialidad: $especialidad, date: $date, edad: $edad) {
      name
      email
      RUT
      password
      especialidad
      Date
      edad
    }
  }
`

export default function Create () {
  const [UserCreate, { loading, error }] = useMutation(CreateUser, {
    refetchQueries: ['Users']
  })
  const formik = useFormik({
    initialValues: {
      name: undefined,
      email:undefined,
      RUT:undefined,
      password:undefined,
      especialidad:undefined,
      Date:undefined,
      edad:undefined
    },
    validationSchema: FormSchema,
    onSubmit: async (values) => {
      UserCreate({ variables:values})
    }
  })
  if (loading) {
    return 'Cargando...'
  }
  if (error) {
    return JSON.stringify(error)
  }
  return (
    <div>
        <h1>Hola</h1>
      <form onSubmit={formik.handleSubmit}>
        <div >
          <input className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-white placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" name='name' placeholder="Nombre" onChange={formik.handleChange} value={formik.values.name} required />
          <input className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-white placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="email" name='email' placeholder="email" onChange={formik.handleChange} value={formik.values.email} required />
          <input className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-white placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" name='RUT' placeholder="RUT" onChange={formik.handleChange} value={formik.values.RUT} required />
          <input className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-white placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" name='password'  placeholder="password" onChange={formik.handleChange} value={formik.values.password} required />
          <input className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-white placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" name='especialidad' placeholder="especialidad" onChange={formik.handleChange} value={formik.values.especialidad} required />
          <input className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-white placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="datetime-local" name='Date' placeholder="Fecha de nacimiento" onChange={formik.handleChange} value={formik.values.Date} required />
          <input className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-white placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="number" name='edad' placeholder="edad" onChange={formik.handleChange} value={formik.values.edad} required />
          
        </div>
        <div className="flex items-center justify-between mt-4">
          <button className="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none" type='submit'>Crear Usuario</button>
        </div>
      </form>
    </div>
  )
}