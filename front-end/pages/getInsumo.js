import Head from 'next/head'
import styles from "styles/Home.module.css"
import NewUser from "components/getInsumo"
import Navbar from 'components/navbar'

export default function NewUserSide(){
    return(
        <div>
            <Head>
                <title>Edudown</title>
            </Head>
            <main>
                <Navbar/>
                <div className='flex flex-col justify-center items-center'>    
                <h1>Insumos</h1>
                <NewUser/>
                </div>
            </main>
        </div>
    )
}