import Head from 'next/head'
import styles from "../styles/Home.module.css"
import NewUser from "../component/UserCreate"

export default function NewUserSide(){
    return(
        <div className={styles.container}>
            <Head>
                <title>Edudown</title>
            </Head>
            <main className={styles.main}>
                <h1>Crear usuario</h1>
                <NewUser/>
            </main>
        </div>
    )
}