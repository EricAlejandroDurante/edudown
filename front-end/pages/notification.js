import Head from 'next/head';
import styles from "../styles/Home.module.css";
import Notification from "../components/Notification/NotificationProblem";

export default function NotificationSide(){
    return (
        <div className={styles.container}>
            <Head>
                <title>Edudown</title>
            </Head>
            <main className={styles.main}>
                <Notification/>
            </main>
        </div>
    )
}