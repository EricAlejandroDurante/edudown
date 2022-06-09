const {gql} = require('apollo-server-express')

//usamos gql para se vea como sintaxis de graphql
const typeDefs = gql`

    type Task{
        id: ID
        title: String
        description: String
        #Que datos retornar cuando se consultan
    }

    type User{
        RUT: String
        name: String
        email: String
        password: String
        especialidad: String
        date: String
        #Que datos retornar cuando se consultan
    }

    type Query{
        hello:String
        getAllTasks: [Task]
        getAllUsers: [User]
    }

    #crear eliminar o modificar usuario, mutation
    type Mutation{
        #Se creara la taera y devolvera la que se creo en la base de datos
        createTask(title: String, description: String): Task #tittle: String, description: String
        createUser(RUT: String, name: String, email: String, password: String, especialidad: String, date: String): User
    }
`
module.exports = {typeDefs}