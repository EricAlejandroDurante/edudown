import { gql, useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import * as Yup from 'yup'
const hours = new Date()
const NotificationSchema = Yup.object().shape({
    boxNotify: Yup.string().required(''),
    dateNotify: Yup.string().required(''),
    timeNotification: Yup.string().required(''),
    userNotification: Yup.string().required(''),
    notification: Yup.string().required('')
})
const NotificationCreate = gql`
    mutation Notification($boxNotify: String, $dateNotify: String, $timeNotification: String, $userNotification: String, $notification: String) {
        createNotifyContingencies(boxNotify: $boxNotify, dateNotify: $dateNotify, timeNotification: $timeNotification, userNotification: $userNotification, notification: $notification) {
            id
            boxNotify
            dateNotify
            timeNotification
            userNotification
            notification
  }
}
`
export default function CreateNotificationProblem() {
    const [notificationCreate, { loading, error }] = useMutation(NotificationCreate, {
        refetchQueries: ['NotifyContingencies'],
        onCompleted: (data) => {
            alert("agregado satisfactoriamente")
          }
    })
    const formik = useFormik({
        initialValues: {
            boxNotify: undefined,
            dateNotify: hours.toLocaleDateString(),
            timeNotification: hours.getHours().toString() + ":" + hours.getMinutes().toString() + ":" + hours.getSeconds().toString(),
            userNotification: undefined,
            notification: undefined
        },
        validationSchema: NotificationSchema,
        onSubmit: async (values) => {
            console.log(values)
            await notificationCreate({ variables: values })
            alert("Se agrego satisfactoriamente")
        }
    })
    if (loading) {
        return <h1>Cargando Notificaciones...</h1>
    }
    if (error) {
        return <p>{JSON.stringify(error)}</p>
    }
    return (
        <div className='w-full max-w-xs'>
            <form className='bg-white w-full max-w-lg shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={formik.handleSubmit}>
                <div>
                    <div className='w-full ms:w1/2 px-3 mb-6 md:mb-0'>
                        <label className='className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                            Ingrese el Box
                        </label>
                        <input className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' type="text" name="boxNotify" placeholder='Ingrese el box que tiene el problema' onChange={formik.handleChange} value={formik.values.boxNotify} required />
                    </div>
                    
                    <div className='w-full ms:w1/2 px-3 mb-6 md:mb-0'>
                        <label className='className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                            Rut/Run
                        </label>
                        <input className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' type="text" name="userNotification" placeholder='Ingrese el rut del usuario' onChange={formik.handleChange} value={formik.values.userNotification} required />
                    </div>

                    <div className='w-full ms:w1/2 px-3 mb-6 md:mb-0'>
                        <textarea className='flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent' type="text" name="notification" placeholder='notification' onChange={formik.handleChange} value={formik.values.notification} required />

                    </div>


                </div>
                <div className="flex items-center justify-between mt-4 px-40">
                    <button className='shadow bg-french-raspberry hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded' type='submit'>Enviar</button>
                </div>
            </form>
        </div>
    )
}