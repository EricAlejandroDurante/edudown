const { required } = require("@hapi/joi/lib/base");
const { Schema, model } = require("mongoose");

const PacienteSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    sesion: {
        type: Number,
        required: true
    },
    etapa: {
        type: String,
        require: true
    }
});
module.exports = model("Paciente", PacienteSchema);