import Head from 'next/head';
import styles from "../styles/Home.module.css";
import Notification from "../component/Notification/NotificationProblem";
import NotificationOnly from '../component/Notification/NotificationOnly';
import NotificationList from "../component/Notification/Notifications"

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