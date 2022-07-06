//import { gql, useMutation } from '@apollo/client'
//import { useFormik } from 'formik'
//import { useRouter } from 'next/router'
//import * as Yup from 'yup'
import styles from '../../styles/Home.module.css'
//import Notification from '../notificationView';
import { useAuth } from '../lib/auth.js'
import { useState } from 'react'



export default function Login(props) {

    const [username, setUsername]= useState('')
    const [password, setPassword]= useState('')

    const {signIn, signOut} = useAuth()
    
    function onSubmit(e){
        e.preventDefault()
        signIn({username, password})
    }
   /* const context = useContext(AuthContext);
    const [errors, setErrors] = useState([]);

    function loginUserCallback(){
        loginUser()
    }

    const formik = useFormik({
        initialValues:{
            email:'',
            password:''
        }
    });

    const [loginUser, {loading}]=useMutation(LOGIN_USER,{
        update(proxy,{data: {loginUser:userData}}){
            context.login(userData);
            return <Notification/>
        },
        onError({graphQLErrors}){
            setErrors(graphQLErrors);
        },
        variables: {loginInput: values}
    });

*/

    return (
        <div classNameNameName="w-full max-w-xs">
            <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <div className='flex flex-col justify-center items-center mb-2'>
                    <img src='/images/logo_edudown.png' className={styles.icon}/>
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>
                        Correo
                    </label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='ejemplo@mail.com' type='text' onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className='mb-6'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>
                        Contraseña
                    </label>
                    <input className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'placeholder='*************' type='password' onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div className='flex items-center justify-between'>
                    <button type='submit' className='bg-french-raspberry hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                        Ingresar
                    </button>
                </div>

            </form>
        </div>
    )
}