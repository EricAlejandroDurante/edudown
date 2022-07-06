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
        lastName: String
        sesion: Int
        etapa: Int
    }

    type Insumo{
        id: ID
        insumo: String
        tipo_insumo: String
        cantidad: Int
    }
    #debemos agregar el token que identifique a cada usuario
    type User{
        id:ID
        RUT: String
        name: String
        lastName: String
        email: String
        password: String
        especialidad: String
        Date: String
        edad: Int
        token: String
        #Que datos retornar cuando se consultan
    }
    #para crear un login, debemos crear un esquema de registro
    input RegisterInput{
        RUT: String
        name: String
        lastName: String
        email: String
        password: String
        especialidad: String
        Date: String
        edad: Int
    }

    #Ahora debemos agregarle el input de Login.
    #input LoginInput{
    #    email: String
    #    password: String
    #}

    type Box{
        id: ID
        tipo_box: String
        tamano_box: String
        estado_actual: String
    }
    # según las especificaciones, se debe tener especialista relacionado- se debe agregar fecha seleccionada a la consulta.
    type Appointment{
        _id: Int
        especialistaID: String
        pacienteID: String
        box_selectedID:String
        horaInicio: String
        selectedDate: String
        especialidadSesion: String
        situacion: String
    }
    
    #Funcionalidad 9, Notificaciones
    type NotifyContingencies {
        id:ID
        boxNotify:String #La idea, es que se entregue el id del box que tiene el problema
        dateNotify: String
        timeNotification: String
        userNotification: String# id del usuario que notifica
        notification: String
    }

    type Query{
        hello:String
        getAllTasks: [Task]
        getAllUsers: [User]

        #creamos un usuario
        user(id: ID!): User

        getAllPacientes: [Paciente]
        getPaciente(id:ID): Paciente
        getInsumosPorEspecialidad(tipo_insumo: String): [Insumo]
        getBox(tipo_box: String):[Box]
        getAppointment: [Appointment]
        getAllNotifyContingencies: [NotifyContingencies]
    }

    input userInput{
        RUT: String
        name: String
        lastName: String
        email: String
        password: String
        especialidad: String
        edad:Int
    }
    #crear eliminar o modificar usuario, mutation
    type Mutation{
        #Se creara la taera y devolvera la que se creo en la base de datos
        createTask(title: String, description: String): Task #tittle: String, description: String

        createUser(RUT: String, name: String, lastName: String, email: String, password: String, especialidad: String, edad:Int): User
        deleteUser(id: ID!): String
        updateUser(id:ID , user: userInput): User!
        createPaciente(name: String, lastName: String, sesion: Int, etapa: Int): Paciente

        #Estas mutaciones son para probar los registros de usuario
        registerUser(RUT: String, name: String,lastName: String,email: String,password: String,especialidad: String,Date: String
        edad: Int): User
        loginUser(email: String, password: String): User


        createBox(id: Int,tipo_box: String, tamano_box: String, estado_actual: String): Box
        UpdateBox(id:Int, estado_actual: String): Box

        createInsumo(id: Int,insumo: String, tipo_insumo: String, cantidad: Int): Insumo
        
        createAppointment(_id: Int, especialistaID:String, pacienteID: String, box_selectedID: Int, horaInicio: String, selectedDate: String, especialidadSesion: String, situacion: String): Appointment
        boxPorDia(especialidadSesion: String): [Appointment]
        caracteristicasAppointment(especialidadSesion: String): [Appointment]
        updateAppointment(_id: Int, situacion: String): Appointment
        deleteAppointment(id: ID!): String #Retornamos un mensaje


        createNotifyContingencies(boxNotify: String, dateNotify: String, timeNotification: String, userNotification: String, notification: String): NotifyContingencies
        deleteNotifyContingencies(id: ID!): String
    }
`

module.exports = {typeDefs}
