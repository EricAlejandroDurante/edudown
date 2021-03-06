import styles from '../styles/Home.module.css'
import { gql, useQuery } from "@apollo/client";
import client from "../apollo-client";
import Head from 'next/head'
import { useFormik } from 'formik'
/*const QUERY= gql`
    query Query {
        getAllAppointments
    }
`*/
const QUERY= gql`
    query Query {
         getAppointment {
            especialidadSesion
        }
}
`

/*export async function getServerSideProps() {
    const data = await client.query({
        query: gql`
        query Query {
            getAllAppointments
          }
          `
    });
    console.log(data);
    return {
        props: {
            notifications: data["data"]["getAllAppointments"],
        },
    };
}*/

export default function Appointment() {
    const {data, loading, error} = useQuery(QUERY)
    if(loading) {
        return <h2>Cargando...</h2>
    }
    if(error){
        return JSON.stringify(error)
    }
    props:{
        notifications:data["data"]["getAppointment"]
    }
    //const notifications= data.getAllAppointment
    return (
        <div className={styles.container}>
            <Head>
                <title>Edudown</title>
            </Head>
            <main>
                <div className='flex flex-col justify-center items-center'>
                    
                <h1>Historico Agendamiento</h1>
            
                <div className='w-full max-w-xs'>
                    <form className='bg-white w-full max-w-lg shadow-md px-8 pt-6 pb-8 mb-4'>
                        <div className='w-full ms:w1/2 px-3 mb-6 md:mb-0'>
                            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                                Kinesiologias:
                            </label>
                            <div className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'>
                            {Math.round(notifications["notifications"][0])}%
                            </div>
                            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                                Kinesiologias Extendias:
                            </label>
                            <div className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'>
                            {Math.round(notifications["notifications"][1])}%
                            </div>
                            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                                Kinesiologias Terminada:
                            </label>
                            <div className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'>
                            {Math.round(notifications["notifications"][2])}%
                            </div>
                            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                                Kinesiologias Suspendidas:
                            </label>
                            <div className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'>
                            {Math.round(notifications["notifications"][3])}%
                            </div>
                        </div>

                        <div className='w-full ms:w1/2 px-3 mb-6 md:mb-0'>
                            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                                Fonoaudiologias:
                            </label>
                            <div className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'>
                            {Math.round(notifications["notifications"][4])}%
                            </div>
                            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                                Fonoaudiologias Extendias:
                            </label>
                            <div className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'>
                            {Math.round(notifications["notifications"][5])}%
                            </div>
                            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                                Fonoaudiologias Terminada:
                            </label>
                            <div className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'>
                            {Math.round(notifications["notifications"][6])}%
                            </div>
                            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                                Fonoaudiologias Suspendidas:
                            </label>
                            <div className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'>
                            {Math.round(notifications["notifications"][7])}%
                            </div>
                        </div>

                    </form>
                </div>
                </div>
            </main>
        </div>
    )
}