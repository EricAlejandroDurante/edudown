const Task = require('./models/Task');
const User = require('./models/User');
const Box = require('./models/Box');
const Insumo = require('./models/Insumo');
const Paciente = require('./models/Paciente');
const Appointment = require('./models/Appointment');
const NotifyContingencies = require('./models/NotifyContingencies');
const { ApolloError } = require('apollo-server-express');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const resolvers = {
    Query:{
        // Mutacion para hacer el login
        user: (_, {ID}) => User.findById(ID),
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
        async createUser(_,{RUT, name, lastName, email, password, especialidad, date, edad}){
            const oldUser = await User.findOne({email});

            // Si existe, le enviamos el error correspondiente

            if(oldUser){
                throw new ApolloError('El usuario ya esta registrado '+email, 'USER_ALREADY_EXISTS')
            }

            //Si no existe, debemos registrarlo y encriptar su contraseña.
            let encryptedPassword = await bcrypt.hash(password, 10);

            //Ahora debemos enviar los datos a mongo db.
                //ni idea por que en el tutorial hicieron eso.
            const newUser = new User({
                RUT: RUT,
                name: name,
                lastName: lastName,
                email: email.toLowerCase(),
                password: encryptedPassword,
                especialidad: especialidad,
                date: date, 
                edad:edad    
            })

            //Ahora creamos el JWT.
            const token = jwt.sign(
                { user_id: newUser._id, email},
                "UNSAFE_STRING",
                {
                    expiresIn: "2h"
                }
                );
            newUser.token = token;
            // Ahora debemos guardar el usuario
            const res = await newUser.save();
            return{
                id: res.id,
                ...res._doc
            }
        },
        /*async createUser(_,args){//creamos a un usuario
            const {RUT, name, lastName, email, password, especialidad,edad} = args
            const newuser = new User({RUT, name, lastName, email, password, especialidad,edad})
            await newuser.save()
            return newuser
        },*/
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
        async deleteNotifyContingencies(_, {id}){
            await NotifyContingencies.findByIdAndDelete(id)
            return 'Notification deleted'
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
            const {_id, especialistaID, pacienteID, box_selectedID, horaInicio, selectedDate, especialidadSesion, situacion}= args
            const newAppointment = new Appointment({_id, especialistaID, pacienteID, box_selectedID, horaInicio, selectedDate, especialidadSesion, situacion})
            await newAppointment.save()
            return newAppointment
        },


        //FUNCIONALIDAD 5
        async updateAppointment(_, args){
            const apupdate = await Appointment.findByIdAndUpdate(args._id, {
                $set: {situacion: args.situacion}
            }, {new: true})
            return apupdate
        },

        //FUNCIONALIDAD 11
        async boxPorDia(_, args){
            //La fecha es, por ejemplo: selectedDate: 30-06-22
            const box_per_day = await Appointment.find({selectedDate: args.selectedDate})
            return box_per_day
        },


        //FUNCIONALIDAD 13
        async caracteristicasAppointment(_, args){
            const caracupdate = await Appointment.find({especialidadSesion: args.especialidadSesion})
            const caracupdateterminada = await Appointment.find({especialidadSesion: args.especialidadSesion})
            let sesiones_terminadas = caracupdate.filter(caracupdate => caracupdate.situacion === "Terminada");
            let sesiones_suspendidas = caracupdate.filter(caracupdate => caracupdate.situacion === "Suspendida");
            let sesiones_extendidas = caracupdate.filter(caracupdate => caracupdate.situacion === "Extendida");
            let sesiones_disponibles = caracupdate.filter(caracupdate => caracupdate.situacion === "Disponible");
            let total = caracupdateterminada.length - sesiones_disponibles.length

            //Porcentaje de sesiones terminadas
            let porc_terminada = sesiones_terminadas.length/total * 100
            //Porcentaje de sesiones suspendidas
            let porc_suspendida = sesiones_suspendidas.length/total *100
            //Porcentaje de sesiones extendidas
            let porc_extendida = sesiones_extendidas.length/total *100
            
            return caracupdate
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

        //Mutacion para el registro de usuarios:
        async registerUser(_, {RUT, name, lastName, email, password, especialidad, date, edad}){
            //Vemos si existe el usuario antiguo
            const oldUser = await User.findOne({email});

            // Si existe, le enviamos el error correspondiente

            if(oldUser){
                throw new ApolloError('El usuario ya esta registrado '+email, 'USER_ALREADY_EXISTS')
            }

            //Si no existe, debemos registrarlo y encriptar su contraseña.
            let encryptedPassword = await bcrypt.hash(password, 10);

            //Ahora debemos enviar los datos a mongo db.
                //ni idea por que en el tutorial hicieron eso.
            const newUser = new User({
                RUT: RUT,
                name: name,
                lastName: lastName,
                email: email.toLowerCase(),
                password: encryptedPassword,
                especialidad: especialidad,
                date: date, 
                edad:edad    
            })

            //Ahora creamos el JWT.
            const token = jwt.sign(
                { user_id: newUser._id, email},
                "UNSAFE_STRING",
                {
                    expiresIn: "2h"
                }
                );
            newUser.token = token;
            // Ahora debemos guardar el usuario
            const res = await newUser.save();
            return{
                id: res.id,
                ...res._doc
            }

        },
        async loginUser( _, {email, password}){
            //vemos si existe el email
            const user = await User.findOne({email});
            //Ahora realizamos un condicional booleano para ver si las contraseñas son iguales

            if(user && (await bcrypt.compare(password, user.password))){
                //Ahora creamos un nuevo token

                const token = jwt.sign(
                    {user_id: user._id, email},
                    "UNSAFE_STRING",
                    {
                        expiresIn: "2h"
                    }
                );
                //adjuntamos el token del usuario.

                user.token = token;

                return {
                    id: user.id,
                    ...user._doc
                }
            }else {
                throw new ApolloError('Incorrect password', 'INCORRECT_PASSWORD')
            }
        }
    }
};

module.exports = {resolvers}