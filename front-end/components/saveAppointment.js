import { gql, useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const NotificationSchema = Yup.object().shape({
    id: Yup.number().required(''),
    especialistaId: Yup.string().required(''),
    pacienteId: Yup.string().required(''),
    boxSelectedId: Yup.number().required(''),
    horaInicio: Yup.string().required(''),
    selectedDate: Yup.string().required(''),
    especialidadSesion: Yup.string().required(''),
    situacion: Yup.string().required('')
})
const NotificationCreate = gql`
    mutation CreateAppointment($id: Int, $especialistaId: String, $pacienteId: String, $boxSelectedId: Int, $horaInicio: String, $selectedDate: String, $especialidadSesion: String, $situacion: String) {
        createAppointment(_id: $id, especialistaID: $especialistaId, pacienteID: $pacienteId, box_selectedID: $boxSelectedId, horaInicio: $horaInicio, selectedDate: $selectedDate, especialidadSesion: $especialidadSesion, situacion: $situacion) {
        _id
        especialistaID
        pacienteID
        box_selectedID
        horaInicio
        selectedDate
        especialidadSesion
        situacion
        }
  }
`
export default function CreateNotificationProblem() {
    let header = ""
    const [notificationCreate, { loading, error }] = useMutation(NotificationCreate, {
        refetchQueries: ['Appointments'],
        onCompleted: (data) => {
            alert("Sesion creada satisfactoriamente")
        }
    })
    const formik = useFormik({
        initialValues: {
            id: '',
            especialistaId: '',
            pacienteId: '',
            boxSelectedId: '',
            horaInicio: '',
            selectedDate: '',
            especialidadSesion: '',
            situacion: ''
        },
        validationSchema: NotificationSchema,
        onSubmit: async (values) => {
            console.log(values)
            await notificationCreate({ variables: values })
        }
    })
    if (loading) {
        header = "Cargando..."
    }
    else if (error) {
        header = "Ya existe o sesion no posible"
    }
    return (
        <div className='w-full max-w-xs'>
            <form className='bg-white w-full max-w-lg shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={formik.handleSubmit}>
                <div>
                    <div className='w-full ms:w1/2 px-3 mb-6 md:mb-0'>
                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                            ID sesion
                        </label>
                        <input className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' type="Number" name="id" placeholder='Numero sesion' onChange={formik.handleChange} value={formik.values.id} required />
                    </div>



                    <div className='w-full ms:w1/2 px-3 mb-6 md:mb-0'>
                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                            RUT especialista
                        </label>
                        <input className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' type="text" name="especialistaId" placeholder='RUT especialista' onChange={formik.handleChange} value={formik.values.especialistaId} required />
                    </div>

                    <div className='w-full ms:w1/2 px-3 mb-6 md:mb-0'>
                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                            RUT paciente
                        </label>
                        <input className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' type="text" name="pacienteId" placeholder='RUT paciente' onChange={formik.handleChange} value={formik.values.pacienteId} required />
                    </div>


                    <div className='w-full ms:w1/2 px-3 mb-6 md:mb-0'>
                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                            ID Box
                        </label>
                        <input className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' type="Number" name="boxSelectedId" placeholder='ID Box' onChange={formik.handleChange} value={formik.values.boxSelectedId} required />
                    </div>

                    <div className='w-full ms:w1/2 px-3 mb-6 md:mb-0'>
                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                            Hora
                        </label>
                        <input className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' type="text" name="horaInicio" placeholder='hh:mm' onChange={formik.handleChange} value={formik.values.horaInicio} required />
                    </div>

                    <div className='w-full ms:w1/2 px-3 mb-6 md:mb-0'>
                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                            Fecha
                        </label>
                        <input className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' type="text" name="selectedDate" placeholder='dd-mm-yy' onChange={formik.handleChange} value={formik.values.selectedDate} required />
                    </div>

                    <div className='w-full ms:w1/2 px-3 mb-6 md:mb-0'>
                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                            Tipo de box
                        </label>
                        <select className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500' type="text" name="especialidadSesion" placeholder="Especialidad" onChange={formik.handleChange} value={formik.values.especialidadSesion} required >
                            <option>Fonoaudiologia</option>
                            <option>Kinesiologia</option>
                            <option>General</option>
                        </select>
                    </div>

                    <div className='w-full ms:w1/2 px-3 mb-6 md:mb-0'>
                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                            Estado Actual
                        </label>
                        <select className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500' type="text" name="situacion" placeholder="Situacion" onChange={formik.handleChange} value={formik.values.situacion} required >
                            <option>Disponible</option>
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