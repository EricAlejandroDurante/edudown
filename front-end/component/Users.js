import { useQuery, gql } from "@apollo/client";
import styles from "../styles/Home.module.css";

const QUERY = gql`
query Users{
    getAllUsers {
      RUT
      name
      email
      password
      especialidad
      Date
      edad
    }
  }
`;

export default function Users(){
    const { data, loading, error }=useQuery(QUERY);
    if (loading) {
        return <h2>Loading</h2>
    }
    if (error) {
        console.error(error);
        return null;
    }
    const getAllUsers = data.getAllUsers;

    return(
        <div>
            {getAllUsers}
        </div>
    );
}