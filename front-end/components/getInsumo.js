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
        <div className="flex flex-wrap -mb-4 content-center m-10">
            {notifications.map((notification) => (
            <div key={notifications.id} className="container max-w-sm rounded shadow-lg m-3 p-3">
                <div className="font-bold text-x1 mb-2">Insumo:         {notification.insumo}</div>
                <h3>Tipo de insumo: {notification.tipo_insumo}</h3>
                <h3>Cantidad:       {notification.cantidad}</h3>
            </div>
            ))}
        </div>
    </div>
  )
}








