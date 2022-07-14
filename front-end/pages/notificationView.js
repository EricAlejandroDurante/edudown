import { useQuery, gql } from "@apollo/client";
import styles from 'styles/Home.module.css'

const query = gql`
  query GetAllNotifyContingencies {
    getAllNotifyContingencies {
        boxNotify
        dateNotify
        userNotification
        timeNotification
        notification
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
  const notifications = data.getAllNotifyContingencies

  return (
    <div className={styles.container}>
        <div className={styles.grid}>
          {notifications.map((notification) => (
            <div key={notifications.id} className={styles.card}>
              <h3>{notification.notification}</h3>
            </div>
          ))}
        </div>
    </div>
  )
}