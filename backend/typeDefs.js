const {gql} = require('apollo-server-express')

//usamos gql para se vea como sintaxis de graphql
const typeDefs = gql`
    type Task{
        id: ID
        title: String
        description: String
        #Que datos retornar cuando se consultan
    }

    type Paciente{
        id: ID
        name: String
        sesion: Int
        etapa: Int
    }

    type Insumo{
        id: ID
        insumo: String
        tipo_insumo: String
        cantidad: Int
    }

    type User{
        id:ID
        RUT: String
        name: String
        email: String
        password: String
        especialidad: String
        Date: String
        edad: Int
        #Que datos retornar cuando se consultan
    }

    type Box{
        id: ID
        tipo_box: String
        tamano_box: String
        estado_actual: String
    }

    type Appointment{
        id: Int
        especialistaID: String
        pacienteID: String
        horaInicio: String
    }

    type Query{
        hello:String
        getAllTasks: [Task]
        getAllUsers: [User]
        getAllPacientes: [Paciente]
        getPaciente(id:ID): Paciente
        getInsumosPorEspecialidad(tipo_insumo: String): [Insumo]
        getBox(tipo_box: String):[Box]
        getAppointment: [Appointment]
    }

    #crear eliminar o modificar usuario, mutation
    type Mutation{
        #Se creara la taera y devolvera la que se creo en la base de datos
        createTask(title: String, description: String): Task #tittle: String, description: String
        createUser(RUT: String, name: String, email: String, password: String, especialidad: String, edad:Int): User
        createBox(id: Int,tipo_box: String, tamano_box: String, estado_actual: String): Box
        createInsumo(id: Int,insumo: String, tipo_insumo: String, cantidad: Int): Insumo
        createPaciente(name: String ,sesion: Int, etapa: Int): Paciente
        createAppointment(id:ID, especialistaID:String, pacienteID: String, horaInicio: String): Appointment
        UpdateBox(id:Int, estado_actual: String): Box
    }
`

module.exports = {typeDefs}