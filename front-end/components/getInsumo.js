import { useQuery, gql } from "@apollo/client";
import { useFormik } from 'formik'
import styles from '../styles/Home.module.css'
import client from "../apollo-client";

const query = gql`
    query GetInsumosPorEspecialidad {
    getInsumosPorEspecialidad {
      id
      insumo
      tipo_insumo
      cantidad
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
  const notifications = data.getInsumosPorEspecialidad

  return (
    <div className={styles.container}>
        <div className={styles.grid}>
            {notifications.map((notification) => (
            <div key={notifications.id} className={styles.card}>
                <h3>{notification.id}</h3>
                <h3>{notification.insumo}</h3>
                <h3>{notification.tipo_insumo}</h3>
                <h3>{notification.cantidad}</h3>
            </div>
            ))}
        </div>
    </div>
  )
}








