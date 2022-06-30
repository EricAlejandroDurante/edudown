import { gql, useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Form,Button } from "react-bootstrap"


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
    <div className='p-3 mb-2 bg-primary text-white'>
      <h1>Hola</h1>
      <form onSubmit={formik.handleSubmit}>

        <div>
        <Form>
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

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>


        </div>
        


       
      </form>
    </div>
  )

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
}