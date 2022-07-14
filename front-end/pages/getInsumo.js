import Head from 'next/head'
import styles from "styles/Home.module.css"
import NewUser from "components/getInsumo"

export default function NewUserSide(){
    return(
        <div className={styles.container}>
            <Head>
                <title>Edudown</title>
            </Head>
            <main>
                <div className='flex flex-col justify-center items-center'>    
                <h1>Insumos</h1>
                <NewUser/>
                </div>
            </main>
        </div>
    )
}