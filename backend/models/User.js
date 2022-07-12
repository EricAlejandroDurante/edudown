const { Schema, model } = require("mongoose");
//agregar 2 cosas en el esquema.
const userSchema = Schema({
    RUT:{
        type: String,
        required: true,
        min: 3,
        max: 20,
    },
    name:{
        type: String,
        required: true,
        min: 8,
        max: 40,
    },
    lastName:{
        type: String,
        required:true,
        min:2,
        max:40,
    },
    email:{
        type: String,
        required: true,
        //necesitamos que los correos sean unicos
        //unique:true
        min: 6,
        max: 50,
    },
    password:{
        type: String,
        required: true,
        min: 6,
        max: 50,
    },
    especialidad:{
        type: String,
        required: true,
        min: 8,
        max: 50,
    },
    /*date:{
        type: Date,
        default: Date.now
    },*/
    edad:{
        type: Number,
        required: true
    },
    //debemos pasarle un token al modelo
    token: { type:String}
});

module.exports = model('User', userSchema);
