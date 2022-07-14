import CreateUser from "layouts/administrador/adminCreateUser"
import Navbar from "components/navbar"
import Agendamiento from "layouts/administrador/adminInsumos"



export default function NewUsers(){

    return(
        <div>
            <Navbar/>
            <div className="grid place-items-center h-screen">
                <CreateUser/>
            </div>
        </div>
    )
}