const { Schema, model } = require("mongoose");

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
    email:{
        type: String,
        required: true,
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
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = model('User', userSchema);
