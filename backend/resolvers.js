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
        // query que se llame viewer, y que a partir del id del jwt decodificado, retorne el usuario que está logueado
        // viewer te tiene que retornar el tipo user
        // averiguar cómo obtener el id del usuario desde el middleware
        // Mutacion para hacer el login
        user: async (_, args) => {
            const usuario = await User.findById(args.id)
            return usuario
        },
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
        //buscamos un usuario por su id
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
        getInsumosPorEspecialidad: async () => {
            //async (_, args)
            //const users = await Insumo.find({tipo_insumo: args.tipo_insumo})
            const users = await Insumo.find()
            return users
        },
        getBox: async(_, args) => {
            console.log(args.tipo_box)
            const box = await Box.findOne({tipo_box : args.tipo_box})
            return box
        },

        getAppointmentDate: async() => {
            let date = new Date();
            let output = String(date.getDate()).padStart(2, '0') + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-22';
            const sessions_today = await Appointment.find({selectedDate: output});
            return sessions_today

        },

        getAllAppointments: async() =>{
            const caracupdate = await Appointment.find({especialidadSesion: "Kinesiologia"})
            
            let sesiones_terminadas = caracupdate.filter(caracupdate => caracupdate.situacion === "Terminada");
            let sesiones_suspendidas = caracupdate.filter(caracupdate => caracupdate.situacion === "Suspendida");
            let sesiones_extendidas = caracupdate.filter(caracupdate => caracupdate.situacion === "Extendida");
            let sesiones_disponibles = caracupdate.filter(caracupdate => caracupdate.situacion === "Disponible");
            let total = caracupdate.length - sesiones_disponibles.length

            //Porcentaje de sesiones terminadas
            let porc_terminada = sesiones_terminadas.length/total * 100
            //Porcentaje de sesiones suspendidas
            let porc_suspendida = sesiones_suspendidas.length/total *100
            //Porcentaje de sesiones extendidas
            let porc_extendida = sesiones_extendidas.length/total *100
            

            const caracupdate_fono = await Appointment.find({especialidadSesion: "Fonoaudiologia"})
            let sesiones_terminadas_fono = caracupdate_fono.filter(caracupdate_fono => caracupdate_fono.situacion === "Terminada");
            let sesiones_suspendidas_fono = caracupdate_fono.filter(caracupdate_fono => caracupdate_fono.situacion === "Suspendida");
            let sesiones_extendidas_fono = caracupdate_fono.filter(caracupdate_fono => caracupdate_fono.situacion === "Extendida");
            let sesiones_disponibles_fono = caracupdate_fono.filter(caracupdate_fono => caracupdate_fono.situacion === "Disponible");
            let total_fono = caracupdate_fono.length - sesiones_disponibles_fono.length

            //Porcentaje de sesiones terminadas
            let porc_terminada_fono = sesiones_terminadas_fono.length/total_fono * 100
            //Porcentaje de sesiones suspendidas
            let porc_suspendida_fono = sesiones_suspendidas_fono.length/total_fono *100
            //Porcentaje de sesiones extendidas
            let porc_extendida_fono = sesiones_extendidas_fono.length/total_fono *100




            return [caracupdate.length, porc_extendida, porc_terminada, porc_suspendida, caracupdate_fono.length,porc_extendida_fono, porc_terminada_fono, porc_suspendida_fono]
        }
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
        async createUser(_,{RUT, name, lastName, email, password, especialidad, edad}){
            const oldUser = await User.findOne({email});
            //console.log("Log: ",email);

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
        }
    }
};

module.exports = {resolvers}