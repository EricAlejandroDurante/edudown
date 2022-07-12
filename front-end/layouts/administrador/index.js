import Head from "next/head";
import UserCreate from "components/UserCreate"
import Notification from "components/Notification/NotificationProblem"
import Users from "components/Users"
import AdminUsers from "./adminUsers";

export default function Administrador(){
    return(
        <div>
            <AdminUsers/>
        </div>
    )
}