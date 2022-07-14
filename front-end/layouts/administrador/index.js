import Head from "next/head";
import UserCreate from "components/UserCreate"
import Notification from "components/Notification/NotificationProblem"
import Users from "components/Users"
import AdminUsers from "./adminUsers";

export default function Administrador() {
    return (
        <div>

            <div>
                <div className="container max-w-sm ">
                    <h1 className="font-bold text-xxl mb-2">Bienvenido a Edudown</h1>
                </div>
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