import Head from "next/head";
import AdminNewUser from "./adminCreateUser";
import Notification from "components/Notification/NotificationProblem"
import Users from "components/Users"
import { useRouter } from 'next/router'
import CreateUser from "./adminCreateUser";
import { useState } from "react";
import Carrousel from "components/Carrousel";
export default function AdminUsers() {
     /*const [userCreat, setUserCreat]= useState(false)
     const handleClick = ({options})=>{
        setUserCreat(!userCreat)
     }*/
     const router= useRouter()
    
    return (
    <div className="grid grid-cols-3">
        <div className="col-span-1">
            <button className="bg-french-raspberry hover:bg-yellow text-white font-bold py-2 px-4 rounded-full m-10" onClick={() => {router.push('/newuser')}} >
            <p>Crear Usuario</p>
            </button>
        </div>

        
        <div className="col-span-2  h-full">
            <Users/>
        </div>
    </div>
    )
}