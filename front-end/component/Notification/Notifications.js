import { useQuery, gql } from "@apollo/client";
import NotificationProblem from "./NotificationProblem";

const QUERY = gql`
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
    const {data , loading, error } = useQuery(QUERY)
    
    if(loading){
        return 'Cargando'
    }
    if(error) {
        return JSON.stringify(error)
    }
    const getAllNotifyContingencies = data.getAllNotifyContingencies
    console.log(getAllNotifyContingencies)
    return(
        <div>
            {!getAllNotifyContingencies && (<div><NotificationProblem/></div>)}
            {getAllNotifyContingencies && (<div>{getAllNotifyContingencies.id}</div>)}
        </div>
    )
}