import { useQuery, gql } from "@apollo/client";
import NotificationProblem from "./NotificationProblem";

const Notify = gql`
    query GetAllNotifyContingencies {
     getAllNotifyContingencies {
        id
        boxNotify
        dateNotify
        userNotification
        timeNotification
        notification
  }
}
`;
export default function AllNotification(){
    const {data , loading, error } = useQuery(Notify)
    console.log(data)
    
    if(loading){
        return <h2>Cargando...</h2>
    }
    if(error) {
        return JSON.stringify(error)
    }
    const getAllNotifyContingencies = data.getAllNotifyContingencies

    return(
        <div>
        <div className="flex flex-wrap -mb-4 content-center m-10">
            {
                getAllNotifyContingencies.map((notification)=>(
                    <div className="container max-w-sm rounded shadow-lg m-3" key={notification.id}>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{notification.id}</div>
                            <div className="font-bold text-xl mb-2">{notification.notification}</div>
                        </div>
                    </div>
                ))
            }
        </div>    
         </div>
    )
}