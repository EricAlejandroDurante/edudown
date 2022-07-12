import Head from "next/head";
import UserCreate from "components/UserCreate"
import Notification from "components/Notification/NotificationProblem"
import Users from "components/Users"
export default function AdminUsers() {
    return (
        <div className="grid grid-cols-3">
            
        <div className="col-span-1 bg-yellow">
            <button className="bg-french-raspberry hover:bg-yellow text-white font-bold py-2 px-4 rounded-full m-10">
                Crear Usuario
            </button>
            <p>Probando</p>
        </div>
        <div className="col-span-2  h-full">
            <Users/>
        </div>
    </div>
    )
}