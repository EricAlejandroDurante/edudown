import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { gql } from "@apollo/client";
import client from "../apollo-client";
export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
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
  });
  console.log(data.getAllNotifyContingencies);
  return {
    props: {
      notifications: data.getAllNotifyContingencies,
    },
  };
}
export default function Home({ notifications }) {
  console.log(notifications)
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