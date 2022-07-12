import { useQuery, gql } from "@apollo/client";
import UserCreate from './UserCreate';

const QUERY = gql`
query Users{
    getAllUsers {
      RUT
      name
      lastName
      email
      password
      especialidad
      edad
    }
  }
`;
export default function Users () {
    const { data, loading, error } = useQuery(QUERY)
    if (loading) {
      return <h2>Cargando...</h2>
    }
    if (error) {
      return JSON.stringify(error)
    }
    const getAllUsers = data.getAllUsers
    return (
      <div >
      <div className="flex flex-wrap -mb-4 content-center m-10">
        {
          getAllUsers.map((user)=>(
            <div className="container max-w-sm rounded shadow-lg m-3" key={user.id}>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{user.name} {user.lastName}</div>
                <p className="text-gray-700 text-base"> {user.email}</p>
                <p>{user.especialidad}</p>
              </div>
            </div>
          ))
        }
      </div>
      </div>
    )
  }