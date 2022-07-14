import Head from "next/head";
import UserCreate from "components/UserCreate"
import Notification from "components/Notification/NotificationProblem"
import Users from "components/Users"
import AdminUsers from "./adminUsers";

export default function Administrador() {
    return (
        <div>
            <div className="font-bold text-5xl flex item-center">
                    <h1 >Bienvenido a EduDown</h1>
                </div>

            <div>
                
                <div className="flex items-center">
                    <img src="/images/mixer-bg.jpg" />
                </div>

            </div>
            <div className="mt-5">

                <footer>
                    
                </footer>
            </div>
        </div>
    )
}