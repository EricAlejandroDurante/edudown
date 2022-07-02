import { gql, useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import * as Yup from 'yup'
const FormSchema = Yup.object().shape({
  name: Yup.string().required(''),
  lastName: Yup.string().required(''),
  email: Yup.string().required('').email(''),
  rut: Yup.string().required(''),
  password: Yup.string().required(''),
  especialidad: Yup.string().required(''),
  edad: Yup.number().required('')
})

const CreateUser = gql`
mutation Mutation($rut: String, $name: String, $lastName: String, $email: String, $password: String, $especialidad: String, $edad: Int) {
  createUser(RUT: $rut, name: $name,lastName: $lastName, email: $email, password: $password, especialidad: $especialidad, edad: $edad) {
    RUT
    name
    lastName
    email
    password
    especialidad
    edad
  }
}
`

export default function Create() {
  const router = useRouter()
  const [UserCreate, { loading, error }] = useMutation(CreateUser, {
    refetchQueries: ['Users'],
    onCompleted: (data) => {
      alert("agregado satisfactoriamente")
      router.push('/')
    }
  })
  const formik = useFormik({
    initialValues: {
      rut: '',
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
    return <h1>Cargando...</h1>
  }
  if (error) {
    return <p>Errorxd:{JSON.stringify(error)}</p>
    //return JSON.stringify(error)
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
            <input className="appearance block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" name="rut" placeholder="11111111-1" onChange={formik.handleChange} value={formik.values.rut} required />

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
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Nombre</label>
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
/*
<div className='flex flex-wrap -mx-3 mb-6'>
        <div className='mb-4'>
          <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>Nombre</label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" name="name" placeholder="Nombre" onChange={formik.handleChange} value={formik.values.name} required />

          </div>

        </div>
        <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>Apellido</label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" name="lastName" placeholder="Apellido" onChange={formik.handleChange} value={formik.values.lastName} required />

          </div>
*/
/*
<form onSubmit={formik.handleSubmit}>
        <div >
          <input type="text" name="rut" placeholder="RUT" onChange={formik.handleChange} value={formik.values.rut} required />
          <input type="text" name="name" placeholder="Nombre" onChange={formik.handleChange} value={formik.values.name} required />
          <input type="text" name="lastName" placeholder="Apellido" onChange={formik.handleChange} value={formik.values.lastName} required />
          <input type="email" name="email" placeholder="email" onChange={formik.handleChange} value={formik.values.email} required />
          <input type="password" name="password" placeholder="password" onChange={formik.handleChange} value={formik.values.password} required />
          <input type="text" name="especialidad" placeholder="especialidad" onChange={formik.handleChange} value={formik.values.especialidad} required />
          <input type="number" name="edad" placeholder="edad" onChange={formik.handleChange} value={formik.values.edad} required />

        </div>
        <div className="flex items-center justify-between mt-4">
          <button type='submit'>Crear Usuario</button>
        </div>
      </form>
*/
/*import { gql, useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Form,Button } from "react-bootstrap"
import styles from "../styles/Home.module.css"


const FormSchema = Yup.object().shape({
  name: Yup.string().required(''),
  lastName: Yup.string().required(''),
  email: Yup.string().required('').email(),
  RUT: Yup.string().required(''),
  password: Yup.string().required(''),
  especialidad: Yup.string().required(''),
  edad: Yup.number().required('')
})

const CreateUser = gql`
mutation Mutation($rut: String, $name: String, $lastName: String, $email: String, $password: String, $especialidad: String, $edad: Int) {
  createUser(RUT: $rut, name: $name, lastName: $lastName, email: $email, password: $password, especialidad: $especialidad, edad: $edad) {
    RUT
    name
    lastName
    email
    password
    especialidad
    edad
  }
}
`

export default function Create() {
  const [UserCreate, { loading, error }] = useMutation(CreateUser, {
    refetchQueries: ['Users']
  })
  const formik = useFormik({
    initialValues: {
      rut: undefined,
      name: undefined,
      lastName: undefined,
      email: undefined,
      password: undefined,
      especialidad: undefined,
      edad: undefined
    },
    validationSchema: FormSchema,
    onSubmit: async (values) => {
      await UserCreate({ variables: values })
    }
  })
  if (loading) {
    return <h1>Cargando...</h1>
  }
  if (error) {
    return <p>Errorxd:{JSON.stringify(error)}</p>
    //return JSON.stringify(error)
  }
  return (
    <div className= {styles.Contenedor}>

      <form onSubmit={formik.handleSubmit}>
        <div className={styles.Form}>
        <Form >
          <Form.Group className="mb-3" controlId="formBasicRUT" >
            <Form.Control name='rut' type="text" placeholder="RUT" onChange={formik.handleChange} value={formik.values.rut} required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control name='name' type="text" placeholder="Nombre" onChange={formik.handleChange} value={formik.values.name} required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Control name='lastName' type="text" placeholder="Apellido" onChange={formik.handleChange} value={formik.values.lastName} required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control name='email' type="email" placeholder="Email" onChange={formik.handleChange} value={formik.values.email} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control name='password' type="password" placeholder="Contraseña" onChange={formik.handleChange} value={formik.values.password} required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicSpeciality">
            <Form.Control name='especialidad' type="text" placeholder="Especialidad" onChange={formik.handleChange} value={formik.values.especialidad} required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAge">
            <Form.Control name='edad' type="number" placeholder="Edad" onChange={formik.handleChange} value={formik.values.edad} required/>
          </Form.Group>
          <Button variant='dark'>dark</Button>
        </Form>



        </div>




      </form>
    </div>
  )*/

/*
      <div >

        <input type="text" name='rut' placeholder="RUT" onChange={formik.handleChange} value={formik.values.rut} required />
        <input type="text" name='name' placeholder="Nombre" onChange={formik.handleChange} value={formik.values.name} required />
        <input type="email" name='email' placeholder="email" onChange={formik.handleChange} value={formik.values.email} required />
        <input type="password" name='password' placeholder="password" onChange={formik.handleChange} value={formik.values.password} required />
        <input type="text" name='especialidad' placeholder="especialidad" onChange={formik.handleChange} value={formik.values.especialidad} required />
        <input type="number" name='edad' placeholder="edad" onChange={formik.handleChange} value={formik.values.edad} required />

      </div>
       <div className="flex items-center justify-between mt-4">
        <button className="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none" type='submit'>Crear Usuario</button>
      </div> */
//}