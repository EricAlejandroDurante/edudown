import { useQuery, gql } from "@apollo/client";
import UserCreate from './UserCreate';

const QUERY = gql`
query Users{
    getAllUsers {
      RUT
      name
      email
      password
      especialidad
      edad
    }
  }
`;
export default function User () {
    const { data, loading, error } = useQuery(QUERY)
    if (loading) {
      return 'Cargando...'
    }
    if (error) {
      return JSON.stringify(error)
    }
    const getAllUsers = data.getAllUsers
    return (
      <div>
        {!getAllUsers && (<div>
          <UserCreate />
        </div>)}
        {getAllUsers && (<div>
          <p>{getAllUsers.name}</p>
        </div>)}
      </div>
    )
  }
/*
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
}*/