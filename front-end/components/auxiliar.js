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
export default function CreateNotificationProblem(){
    const [notificationCreate, { loading, error}] = useMutation( NotificationCreate, {
        refetchQueries: ['NotifyContingencies']
    })
    const formik = useFormik({
        initialValues: {
            boxNotify: undefined,
            dateNotify: hours.toLocaleDateString(),
            timeNotification: hours.getHours().toString()+":"+ hours.getMinutes().toString()+":"+hours.getSeconds().toString(),
            userNotification: undefined,
            notification: undefined
        },
        validationSchema: NotificationSchema,
        onSubmit: async( values ) => {
            console.log(values)
            await notificationCreate({ variables: values})
        }
    })
    if (loading) {
        return <h1>Cargando Notificaciones...</h1>
    }
    if (error){
        return <p>{JSON.stringify(error)}</p>
    }
    return(
        <div>
            <h1>Ingrese su problema</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <input type="text" name="boxNotify" placeholder='Ingrese el box que tiene el problema' onChange={formik.handleChange} value={formik.values.boxNotify} required/>
                    <br/>
                    <input type="text" name="userNotification" placeholder='Ingrese el rut del usuario' onChange={formik.handleChange} value={formik.values.userNotification} required/>
                    <br/>
                    <textarea type="text" name="notification" placeholder='notification' onChange={formik.handleChange} value={formik.values.notification} required/>
                
                </div>
                <div>
                    <button type='submit'>Ingresar Notificacion</button>
                </div>
            </form>
        </div>
    )
}