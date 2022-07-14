import Head from 'next/head'
import styles from "styles/Home.module.css"
import NewUser from "components/saveAppointment"
import Navbar from 'components/navbar'

export default function NewUserSide(){
    return(
        <div >
            <Navbar/>
                <div className='flex flex-col justify-center items-center'>
                    
                <h1>Agendar Sesion</h1>
                <NewUser/>

                </div>

            
        </div>
    )
}