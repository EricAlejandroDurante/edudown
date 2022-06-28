const Task = require('./models/Task');
const User = require('./models/User');
const Box = require('./models/Box');
const Insumo = require('./models/Insumo');
const Paciente = require('./models/Paciente');
//const Appointment = require('./models/Appointment');

const resolvers = {
    Query:{
        //Que es lo que consulo: () => que es lo que retorno
        hello: () => "Hello World",
        getAllTasks: async () => {
            const tasks = await Task.find()
            return tasks
        },
        getAllUsers: async () => {
            const users = await User.find()
            return users
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
        /*getAppointment: async(_,args) => {
            const appointment = await Appointment.find({especialistaID: args.especialistaID, pacienteID: args.pacienteID, horaInicio:args.horaInicio})
            return appointment
        },*/
    },
    //guardando en base de datos
    Mutation:{
        async createTask(_,args){
            const {title, description} = args
            const newTask = new Task({title, description})
            await newTask.save()
            return newTask
        },
        async createUser(_,args){
            const {RUT, name, email, password, especialidad,edad} = args
            const newuser = new User({RUT, name, email, password, especialidad,edad})
            await newuser.save()
            return newuser
        },
        async createBox(_,args){
            const {id, tipo_box, tamano_box, estado_actual} = args
            const newuser = new Box({id, tipo_box, tamano_box, estado_actual})
            await newuser.save()
            return newuser
        },
        async createInsumo(_,args){
            const {id, insumo, tipo_insumo, cantidad} = args
            const newuser = new Insumo({id, insumo, tipo_insumo, cantidad})
            await newuser.save()
            return newuser
        },
        async createPaciente(_,args){
            const {id, sesion, etapa} = args
            const newuser = new Paciente({id, sesion, etapa})
            await newuser.save()
            return newuser
        },
        /*async createAppointment(_, args){
            const {id, especialistaID, pacienteID, horaInicio}= args
            const newAppointment = new Appointment({id, especialistaID, pacienteID, horaInicio})
            await newAppointment.save()
            return newAppointment
        },*/
        async UpdateBox(_,args){
            const boxUpdate = await Box.updateOne({id: args.id},{
                $set: args
            })
            return boxUpdate
        },
    }
};

module.exports = {resolvers}