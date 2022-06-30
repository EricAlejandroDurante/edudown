import Head from 'next/head';
import styles from "../styles/Home.module.css";
import Notification from "../component/auxiliar";

export default function NotificationSide(){
    return (
        <div className={styles.container}>
            <Head>
                <title>Edudown</title>
            </Head>
            <main className={styles.main}>
                <h1>Notifique su problema</h1>
                <Notification/>
            </main>
        </div>
    )
}