import { useFormik } from 'formik'
import * as Yup from 'yup'
// Importante, aqui defines el schema con los errores
const FormSchema = Yup.object().shape({
  name: Yup.string().required('Se necesita un nombre'),
  lastName: Yup.string().required('Se necesita el apellido'),
  middleName: Yup.string().required('Se necesita el segundo apellido'),
  email: Yup.string().required('Se necesita el correo').email('Correo inválido'),
  phone: Yup.string().required('Se necesita el teléfono')
})

export default function New() {
  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      middleName: '',
      email: '',
      phone: ''
    },
    validationSchema: FormSchema,
    onSubmit: async (values) => {
      // make create
      // Apollo Query
      alert(JSON.stringify(values))
    }
  })
  //   if (loading) {
  // return 'Cargando...'
  //   }
  //   if (error) {
  // return JSON.stringify(error)
  //   }
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="w-full mt-4">
          <input className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-white placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" name='name' placeholder="Nombre" onChange={formik.handleChange} value={formik.values.name} required />
          {formik.errors.name && <p>{formik.errors.name}</p>}
          <input className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-white placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" name='lastName' placeholder="Apellido" onChange={formik.handleChange} value={formik.values.lastName} required />
          <input className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-white placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" name='middleName' placeholder="Segundo apellido" onChange={formik.handleChange} value={formik.values.middleName} required />
          <input className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-white placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="email" name='email' placeholder="Correo electrónico" onChange={formik.handleChange} value={formik.values.email} required />
          <input className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-white placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="tel" name='phone' placeholder="Teléfono" onChange={formik.handleChange} value={formik.values.phone} required />
        </div>
        <div className="flex items-center justify-between mt-4">
          <button className="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none" type='submit'>Crear Contacto</button>
        </div>
      </form>
    </div>
  )
}