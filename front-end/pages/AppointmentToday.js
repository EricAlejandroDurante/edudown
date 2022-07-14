import { useQuery, gql } from "@apollo/client";
import { useFormik } from 'formik'
import styles from '../styles/Home.module.css'
import client from "../apollo-client";

const query = gql`
    query GetAppointmentDate {
        getAppointmentDate {
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

export default function Home() {
  const {data, loading, error} = useQuery(query);
  if (loading) {
    return <h2>Cargando</h2>
  }
  if (error) {
    return JSON.stringify(error)
  }
  const notifications = data.getAppointmentDate

  return (
    <div className={styles.container}>
        <div className={styles.grid}>
          {notifications.map((notification) => (
            <div key={notifications.id} className={styles.card}>
              <h3>Especialista: {notification.especialistaID}</h3>
              <h3>Paciente: {notification.pacienteID}</h3>
              <h3>Box: {notification.box_selectedID} -  {notification.especialidadSesion}</h3>
              <h3>Horario: {notification.horaInicio}</h3>
              <h3>situacion:  {notification.situacion}</h3>              
            </div>
          ))}
        </div>
    </div>
  )
}