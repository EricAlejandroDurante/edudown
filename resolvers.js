const Task = require('./models/Task');
const User = require('./models/User');

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
            const {RUT, name, email, password, especialidad} = args
            const newuser = new User({RUT, name, email, password, especialidad})
            await newuser.save()
            return newuser
        }
    }
};

module.exports = {resolvers}