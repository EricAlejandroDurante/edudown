import { gql, useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const NotificationSchema = Yup.object().shape({
    createBoxId: Yup.number().required(''),
    tipoBox: Yup.string().required(''),
    tamanoBox: Yup.string().required(''),
    estadoActual: Yup.string().required('')
})
const NotificationCreate = gql`
mutation CreateBox($createBoxId: Int, $tipoBox: String, $tamanoBox: String, $estadoActual: String) {
    createBox(id: $createBoxId, tipo_box: $tipoBox, tamano_box: $tamanoBox, estado_actual: $estadoActual) {
      id
      tipo_box
      tamano_box
      estado_actual
    }
  }
`
export default function CreateNotificationProblem() {
    let header = ""
    const [notificationCreate, { loading, error }] = useMutation(NotificationCreate, {
        refetchQueries: ['Boxes'],
        onCompleted: (data) => {
            alert("agregado satisfactoriamente")
        }
    })
    const formik = useFormik({
        initialValues: {
            createBoxId: '',
            tipoBox: '',
            tamanoBox: '',
            estadoActual: ''
        },
        validationSchema: NotificationSchema,
        onSubmit: async (values) => {
            console.log(values)
            await notificationCreate({ variables: values })
        }
    })
    if (loading) {
        header = "Cargando Notificaciones..."
    }
    else if (error) {
        header = "Ya existe El box"
    }
    return (
        <div className='w-full max-w-xs'>
            <form className='bg-white w-full max-w-lg shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={formik.handleSubmit}>
                <div>
                    <div className='w-full ms:w1/2 px-3 mb-6 md:mb-0'>
                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                            Numero de Box
                        </label>
                        <input className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' type="Number" name="createBoxId" placeholder='Numero de Box' onChange={formik.handleChange} value={formik.values.createBoxId} required />
                    </div>




                    <div className='w-full ms:w1/2 px-3 mb-6 md:mb-0'>
                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                            Tipo de box
                        </label>
                        <select className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500' type="text" name="tipoBox" placeholder="Tipo Box" onChange={formik.handleChange} value={formik.values.tipoBox} required >
                            <option>Fonoaudiologia</option>
                            <option>Kinesiologia</option>
                            <option>General</option>
                        </select>
                    </div>





                    <div className='w-full ms:w1/2 px-3 mb-6 md:mb-0'>
                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                            Tamaño Box
                        </label>
                        <select className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500' type="text" name="tamanoBox" placeholder="Tamaño Box" onChange={formik.handleChange} value={formik.values.tamanoBox} required >
                            <option>Grande</option>
                            <option>Mediano</option>
                            <option>Pequeño</option>
                        </select>
                    </div>




                    <div className='w-full ms:w1/2 px-3 mb-6 md:mb-0'>
                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                            Estado Actual
                        </label>
                        <select className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500' type="text" name="estadoActual" placeholder="Estado Actual" onChange={formik.handleChange} value={formik.values.estadoActual} required >
                            <option>Disponible</option>
                            <option>Mantencion</option>
                        </select>
                    </div>

                </div>





                <div className="flex items-center justify-between mt-4 px-40">
                    <button className='shadow bg-french-raspberry hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded' type='submit'>Enviar</button>

                </div>
                <div className="text-rojo px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">{header}</strong>
                </div>
            </form>
        </div>
    )
}