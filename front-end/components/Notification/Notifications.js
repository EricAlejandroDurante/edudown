import { useQuery, gql } from "@apollo/client";
import NotificationProblem from "./NotificationProblem";

const Notify = gql`
    query GetAllNotifyContingencies {
     getAllNotifyContingencies {
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
        return 'Cargando...'
    }
    if(error) {
        return JSON.stringify(error)
    }
    const getAllNotifyContingencies = data.getAllNotifyContingencies

    return(
        <div>
            {!getAllNotifyContingencies && (<div><NotificationProblem/></div>)}
            {getAllNotifyContingencies && (<div>{getAllNotifyContingencies.dateNotify}</div>)}
        </div>
    )
}