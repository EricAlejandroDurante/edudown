const Task = require('./models/Task');
const User = require('./models/User');
const Box = require('./models/Box');
const Insumo = require('./models/Insumo');
const Paciente = require('./models/Paciente');
const Appointment = require('./models/Appointment');
const NotifyContingencies = require('./models/NotifyContingencies');

const resolvers = {
    Query:{
        //Que es lo que consulo: () => que es lo que retorno
        hello: () => "Hello World",
        getAllTasks: async () => {
            const tasks = await Task.find()
            return tasks
        },
        //obtenemos a todos los usuarios
        getAllUsers: async () => {
            const users = await User.find()
            return users
        },
        //buscamos un paciente por su id
        getPaciente: async(_, args) => {
            const paciente = await Paciente.findById(args.id)
            return paciente
        } ,
        //obtenemos a todos los pacientes
        getAllPacientes: async () => {
            const pacientes = await Paciente.find()
            return pacientes
        },
        //creamos un agendamiento, el nombre no representa a lo que hace realmente
        getAppointment: async() => {
            const appointment = await Appointment.find()
            return appointment
        },
        //obtenemos todas las notificaciones
        getAllNotifyContingencies: async() => {
            const allNotifyContingencies = await NotifyContingencies.find()
            return allNotifyContingencies
        },
        getInsumosPorEspecialidad: async (_, args) => {
            const users = await Insumo.find({tipo_insumo: args.tipo_insumo})
            return users
        },
        getBox: async(_, args) => {
            console.log(args.tipo_box)
            const box = await Box.findOne({tipo_box : args.tipo_box})
            return box
        },
    },
    //guardando en base de datos
    Mutation:{
        //es solo de ejemplo
        async createTask(_,args){
            const {title, description} = args
            const newTask = new Task({title, description})
            await newTask.save()
            return newTask
        },
        //Mutaciones de usuario
        async createUser(_,args){//creamos a un usuario
            const {RUT, name, lastName, email, password, especialidad,edad} = args
            const newuser = new User({RUT, name, lastName, email, password, especialidad,edad})
            await newuser.save()
            return newuser
        },
        async deleteUser(_, {id}){//eliminamos al usuario
            await User.findByIdAndDelete(id);
            return 'User delete'
        },
        async updateUser(_, {user, id}){//Actualizamos datos de los usuarios
            const userUpdate = await User.findByIdAndUpdate(id, {
                $set: user
            }, {new: true})
            return userUpdate
        },
        
        //mutacion de creación de notificación
        async createNotifyContingencies(_, args){
            const { boxNotify, dateNotify, timeNotification, userNotification, notification}= args
            const newNotification = new NotifyContingencies({ boxNotify, dateNotify, timeNotification, userNotification, notification})
            await newNotification.save()
            return newNotification
        },
        //creamos un paciente
        async createPaciente(_,args){
            const {name, lastName, sesion, etapa} = args
            const newPaciente = new Paciente({name, lastName, sesion, etapa})
            await newPaciente.save()
            return newPaciente
        },
        //se crea un box
        async createBox(_,args){
            const {id, tipo_box, tamano_box, estado_actual} = args
            const newuser = new Box({id, tipo_box, tamano_box, estado_actual})
            await newuser.save()
            return newuser
        },
        //Se crea un insumo
        async createInsumo(_,args){
            const {id, insumo, tipo_insumo, cantidad} = args
            const newuser = new Insumo({id, insumo, tipo_insumo, cantidad})
            await newuser.save()
            return newuser
        },
        //se crea un agendamiento a un box, esto debe tener las tres mutaciones.
        async createAppointment(_, args){
            const {id, especialistaID, pacienteID, box_selectedID, horaInicio, selectedDate}= args
            const newAppointment = new Appointment({id, especialistaID, pacienteID, box_selectedID, horaInicio, selectedDate})
            await newAppointment.save()
            return newAppointment
        },
        async deleteAppointment(_, {id}){
            await Appointment.findByIdAndDelete(id)
            return 'Appointment deleted'
        },
        //Se actualiza el estado del box
        async UpdateBox(_,args){
            const boxUpdate = await Box.updateOne({id: args.id},{
                $set: args
            })
            return boxUpdate
        },
    }
};

module.exports = {resolvers}