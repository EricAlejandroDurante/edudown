const { Schema, model } = require("mongoose");

const PacienteSchema = new Schema({
    id: {
        type: String
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