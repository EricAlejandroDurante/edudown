const { Schema, model } = require("mongoose");

const AppointmentSchema = new Schema({
    id: {
        type: String
    },
    especialistaID: {
        type: String,
        required: true
    },
    pacienteID: {
        type: String,
        require: true
    },
    horaInicio: {
        type: String,
        required: true
    }
});
module.exports = model("Appointment", AppointmentSchema);