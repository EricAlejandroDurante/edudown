import Head from 'next/head';
import styles from "../styles/Home.module.css";
import Notification from "../components/Notification/NotificationProblem";
import NotificationOnly from '../components/Notification/NotificationOnly';
import NotificationList from "../components/Notification/Notifications"

export default function NotificationSide() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Edudown</title>
            </Head>
            <main className={styles.main}>
                <h1>Notificaciones</h1>
                <div>
                    <NotificationOnly>
                        <NotificationList/>
                    </NotificationOnly>
                </div>
            </main>
        </div>
    )
}