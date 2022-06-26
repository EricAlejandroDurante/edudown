const { Schema, model } = require("mongoose");

const AppointmentSchema = new Schema({
    id: {
        type: Number
    },
    especialistaID: {
        type: ID,
        required: true
    },
    pacienteID: {
        type: ID,
        require: true
    },
    horaInicio: {
        type: date-time,
        required: true
    }
});
module.exports = model("Appointment", AppointmentSchema);