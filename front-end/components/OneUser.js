import { useQuery, gql } from "@apollo/client";
import { Formik } from "formik";
import { useSession } from "next-auth/react";
import React from "react";




const QUERY =gql`
    query User($userId: ID!) {
         user(id: $userId) {
            id
            name
            lastName
            especialidad
  }
}
`



const User = ({userId})=>{
    //const sessionId={userId:session.sessionId}

    const { data, loading, error} =useQuery(QUERY,{
        variables: {userId},
    });


    if(loading){
        return <h2>Cargando</h2>
    }
    if(error){
        return JSON.stringify(error)
    }
    const getUser=data.user
    return(
        <div>
            Hola
            {getUser.name}
        </div>
    )

}

export default User;