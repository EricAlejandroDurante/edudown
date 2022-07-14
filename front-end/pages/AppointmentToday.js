import { useQuery, gql } from "@apollo/client";
import { useFormik } from 'formik'
import styles from '../styles/Home.module.css'
import client from "../apollo-client";
import Navbar from "components/navbar";

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
  const { data, loading, error } = useQuery(query);
  if (loading) {
    return <h2>Cargando</h2>
  }
  if (error) {
    return JSON.stringify(error)
  }
  const notifications = data.getAppointmentDate

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.grid}>
          {notifications.map((notification) => (
            <div className="flex justify-center ">
              <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
                <h3 className="text-gray-900 text-xl leading-tight font-medium mb-2">Especialista: {notification.especialistaID}</h3>
                <h3 className="text-gray-700 text-base mb-4">Paciente: {notification.pacienteID}</h3>
                <h3 className="text-gray-700 text-base mb-4">Box: {notification.box_selectedID} -  {notification.especialidadSesion}</h3>
                <h3 className="text-gray-700 text-base mb-4">Horario: {notification.horaInicio}</h3>
                <h3 className="text-gray-700 text-base mb-4">situacion:  {notification.situacion}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}