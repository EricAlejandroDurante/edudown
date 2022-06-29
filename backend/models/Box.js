const { Schema, model } = require("mongoose");

const BoxSchema = new Schema({
    id: {
        type: Number
    },
    tipo_box: {//Existen 3 tipos de Box, General, Kinesiología, Fonoaudiología ¿Que se considera pequeño - mediano - grande?
        type: String,
        required: true
    },
    tamano_box: {//pequeño-mediano-grande
        type: String,
        require: true
    },
    estado_actual: {//ocupado-mantenimiento-libre //esto se actualizará a través del front
        type: String,
        required: true
    }
    //creo que se debe agregar a la enfermera de box
});
module.exports = model("Box", BoxSchema);