const Task = require('./models/Task');
const User = require('./models/User');
const Box = require('./models/Box');
const Insumo = require('./models/Insumo');

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
        }
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
        }
    }
};

module.exports = {resolvers}